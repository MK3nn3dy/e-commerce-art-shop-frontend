import { useUserContext } from "../hooks/useUserHook";

const CheckoutBar = () => {

    const { dispatch, user_id, basket_items, token } = useUserContext();

    // total price of basket
    let basket_total = 0.00;

    basket_items.forEach((item) => {
        basket_total += (parseFloat(item.price) * parseInt(item.quantity));
    })

    const handleCheckout = async (e) => {

        e.preventDefault();

        let orderItems = [];

        try {
            basket_items.forEach((item) => {
                orderItems.push(item);
            })
    
            const orderId = await fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderItems)
            })
            
            // get the id of the new order for order confirmed screen
            const jsonOrderId = await orderId.json();

            // before changing state below, delete all rows in baskets
            // db with this users ID
            await fetch('http://localhost:5000/baskets', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({user_id})
            })

            // at very end, set basket back to null
            dispatch({ type: 'SET_BASKET', payload: []});

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="checkout-bar">
            <h5 className="basket-total">Basket Total: £{basket_items && basket_total.toFixed(2)}</h5>
            <div className="checkout-button" onClick={handleCheckout} >Checkout</div>
        </div>
    )

}

export default CheckoutBar;