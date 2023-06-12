import React from 'react';
import {AiOutlineShoppingCart} from "react-icons/ai";
import {Link} from "react-router-dom";

const CartClear = () => {
    return (
        <div className="CartClear">
            <div className="CartClear-title">Корзина</div>
            <AiOutlineShoppingCart size={270}/>
            <div className="CartClear-subtitle">В данный момент ваша корзина пуста!</div>
            <div className="CartClear-text">
                Прежде чем приступить к оформлению заказа, вы должны добавить некоторые
                товары в свою корзину. На странице "Меню" вы найдёте много вкусной продукции
            </div>
            <Link to="/menu" className="btnUpdate btnGoBack">
                В меню
            </Link>
        </div>
    );
};

export default CartClear;