// imports 
import { useEffect } from "react";
import CheckoutBar from "../components/CheckoutBar";
import { useUserContext } from "../hooks/useUserHook";

const Basket = () => {

    // destructure from user context
    const {user_id, basket_items, token, dispatch} = useUserContext();


    // Load basket at render, dispatch, and user_id change
    useEffect(() => {
        const getBasket = async () => {
            const basketItems = await fetch('http://localhost:5000/baskets/' + user_id, {
                headers: { 'Authorization': `Bearer ${token}`}
            });
            const jsonData = await basketItems.json();

            dispatch({ type: 'SET_BASKET', payload: jsonData});
        }

        if(!user_id == null){
            getBasket();
        }
        
    }, [dispatch, user_id])


    // handle quantity value change
    const handleChange = async (e) => {

        e.preventDefault();

        const requestObject = {
            type: 'UPDATE_QUANTITY',
            piece_id: e.target.id,
            quantity: e.target.value,
            // multiplies price with quantity
            price: (e.target.parentNode.parentNode.childNodes[2].innerHTML) * e.target.value
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

        // update basket in context (dispatch)
        const newBasketItems = await fetch('http://localhost:5000/baskets/' + user_id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const jsonData = await newBasketItems.json();
        dispatch({ type: 'SET_BASKET', payload: jsonData});
        
    }


    // handle delete item when delete clicked
    const handleDelete = async (e) => {

        e.preventDefault();

        const requestObject = {
            piece_id: e.target.parentNode.childNodes[3].childNodes[1].id // goes to parent, third child, second child, and gets ID
        }

        await fetch('http://localhost:5000/baskets/' + user_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestObject)
        })

        const newBasketItems = await fetch('http://localhost:5000/baskets/' + user_id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
            const jsonData = await newBasketItems.json();

            dispatch({ type: 'SET_BASKET', payload: jsonData});

    }

    return (
        <div className="page-container">
            <section className="page-panel">
                { user_id && basket_items.map((item, index) => (
                    <div key={index} className="basket-item">
                        <h4>{item.description}</h4>
                        <p>Price per unit: £</p><span>{item.price}</span>
                        <form className="change-quantity-form">
                            <label>Quantity: </label>
                            <input id={item.piece_id}
                                   type="number" 
                                   value={item.quantity}
                                   onChange={handleChange}
                            >
                            </input>
                        </form>
                        <p>Total for this item: £ {item.price * item.quantity}</p>
                        <div className="remove-all-from-basket" onClick={handleDelete}>Remove All</div>
                    </div>
                ))
                }
            </section>
            <CheckoutBar />
        </div>
    ) 
}

export default Basket;