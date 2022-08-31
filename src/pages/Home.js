import { useEffect } from "react";
import { usePiecesContext } from "../hooks/usePiecesHook";
import { useUserContext } from "../hooks/useUserHook";

const Home = () => {

    // requires CORS middleware on backend index.js to make requests from port 3000 to 5000

    // get state and dispatch from pieces context
    const { pieces, dispatch } = usePiecesContext();
    const { user_id, basket_items, token, dispatch: userDispatch } = useUserContext();

    useEffect(() => {
        const getAllPieces = async () => {
            const response = await fetch('http://localhost:5000/products');
            const jsonData = await response.json();

            if(response.ok){
                dispatch({ type: 'SET_PIECES', payload: jsonData});
            }

            console.log(jsonData)
            
        }
        getAllPieces();

        const getBasket = async () => {
            const basketItems = await fetch('http://localhost:5000/baskets/' + user_id, {
                headers: { 'Authorization': `Bearer ${token}`}
            });
            const jsonData = await basketItems.json();

            userDispatch({ type: 'SET_BASKET', payload: jsonData});
            console.log(jsonData);
        }
        if(user_id){
            getBasket();
        }

    },[dispatch, userDispatch, user_id])


    // handle add to cart
    const handleAddToCart = async (e) => {

        e.preventDefault();

        console.log(e.target.parentNode.childNodes[5].value)

        const requestObject = {
            type: 'ADD_TO_BASKET',
            piece_id: e.target.parentNode.id,
            quantity: e.target.parentNode.childNodes[5].value,
            // price * quantity
            price: (e.target.parentNode.childNodes[3].innerHTML * e.target.parentNode.childNodes[5].value)
        }

        console.log(requestObject.price);


        await fetch('http://localhost:5000/baskets/' + user_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestObject)
        })


        // update user basket in context (dispatch destructured as userDispatch)
        const newBasketItems = await fetch('http://localhost:5000/baskets/' + user_id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const jsonData = await newBasketItems.json();
        userDispatch({ type: 'SET_BASKET', payload: jsonData});

    }

    // loop through products and display product cards within product panel
    return (
        <div className="page-container">
            <div className="page-panel">
                {pieces && pieces.map(piece => (
                    <div id ={piece.piece_id} className="product-card" key={piece.piece_id}>
                        <h3>{piece.description}</h3>
                        <img className="product-image" src={piece.img_url}/>
                        <p className="pounds">£</p><span className="price">{piece.price}</span>
                        <label className="quantity-label">Quantity: </label>
                        <input className="quantity" type="number" min="0"/>
                        <p className="stock">In stock: {piece.available}</p>
                        <div className="cart-btn" onClick={handleAddToCart}>Add to Cart</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;