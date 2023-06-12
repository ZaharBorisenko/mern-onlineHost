import React from 'react';
import {NavLink} from "react-router-dom";

const UserMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="list-group">
                    <h4>Личный кабинет</h4>
                    <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Профиль</NavLink>
                    <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Мои заказы</NavLink>
                </div>
            </div>
        </>
    );
};

export default UserMenu;