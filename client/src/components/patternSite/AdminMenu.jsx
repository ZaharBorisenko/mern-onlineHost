import React from 'react';
import {NavLink} from "react-router-dom";
import { AiOutlineUser, AiFillTool,AiFillTags,AiOutlineDatabase} from "react-icons/ai";
const AdminMenu = () => {
    return (
        <>
            <div className=''>
                <h4 className="adminPanel-title">Панель администратора</h4>
                <div className="adminPanel-links">
                    <NavLink to="/dashboard/admin/" className="adminPanel-link">
                        Профиль
                        <AiOutlineUser size={26} className="adminPanel-icons"/>
                    </NavLink>
                    <NavLink to="/dashboard/admin/create-category" className="adminPanel-link">
                        Создать категорию
                        <AiFillTool size={26} className="adminPanel-icons"/>
                    </NavLink>
                    <NavLink to="/dashboard/admin/create-product" className="adminPanel-link">
                        Создать товар
                        <AiFillTool size={26} className="adminPanel-icons"/>
                    </NavLink>
                    <NavLink to="/dashboard/admin/orders" className="adminPanel-link">
                        Заказы
                        <AiFillTags size={26} className="adminPanel-icons"/>
                    </NavLink>
                    <NavLink to="/dashboard/admin/products" className="adminPanel-link">
                        Товар
                        <AiOutlineDatabase size={26} className="adminPanel-icons"/>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default AdminMenu;