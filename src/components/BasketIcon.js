// imports
import { useContext, useEffect } from "react";
import { UserContext, userReducer } from "../contexts/userContext";

const BasketIcon = () => {

    const { basket_items } = useContext(UserContext);

    return (
        <div className="cart-icon">
            <p className="nav-link">Basket</p>
            <div className="cart-count">{basket_items.length}</div>
        </div>
    )
}

export default BasketIcon;