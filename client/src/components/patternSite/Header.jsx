import React from 'react';
import { NavLink, Link } from "react-router-dom";
import {useAuth} from "../../context/auth";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";
import {useCart} from "../../context/cart";
import {Badge} from "antd";
import shoppingCart from '../../img/shopping-cart.png'
import SearchInput from "../Form/SearchInput";
import logo from "../../img/logoHeader.png"
import { AiOutlineShoppingCart } from "react-icons/ai";
import profileUser from "../../img/profileUser.png"
import ExitProfile from "../../img/exitProfile.png"


const Header = () => {
    const [cart] = useCart();
    const  [auth, setAuth] = useAuth();
    const categories = useCategory();
    const handleLogout = () => {
        setAuth({
            ...auth, user:null, token:''
        })
        localStorage.removeItem('auth')
        toast.success('Выход успешен', { sticky: true })
    }


    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toFixed(0).toLocaleString("ru", {
                style: "currency",
                currency: "RUB",
            });
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <nav className="navbar navbar-expand-xxl header-Main-container">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="header-container collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-container navbar-nav">

                            <Link to="/" className="header-logo">
                                <p className="logo-title">☕ Sweet-day </p>
                            </Link>
                            <SearchInput/>

                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">
                                    Главная страница
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/menu" className="nav-link">
                                    Меню
                                </NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to={"/categories"}
                                    data-bs-toggle="dropdown"
                                >
                                    Категории
                                </Link>
                                <ul className="dropdown-menu">
                                    {categories?.map((c) => (
                                        <li key={c.name}>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {!auth.user ? (<>
                                    <li className="nav-item nav-item-registerLogin">
                                        <NavLink to="/login" className="nav-link">
                                            Вход
                                        </NavLink>
                                        <div>/</div>
                                        <NavLink to="/register" className="nav-link">
                                            Регистрация
                                        </NavLink>
                                    </li>
                            </>
                            ) : (
                                <>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle profileUserToggle" href="#" role="button"
                                           data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={profileUser} alt="Profile"/>
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li className="dropdownMenu-name mt-1"><span>{auth?.user?.name}</span></li>
                                            <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>{`${auth?.user?.role === 1 ? 'Админ панель' : 'Личный кабинет'}`}</NavLink></li>
                                            <li>
                                                <NavLink onClick={handleLogout} to="/login" className="dropdown-item mt-1">
                                                    <img src={ExitProfile} alt="Выйти"/>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                            </>)
                            }
                            <li className="nav-item nav-item-cartContainer">

                                <div className="cartTotalPrice">{totalPrice()} ₽</div>

                                <div className="button__delimiter"></div>

                                <div className="cartContainer-right">
                                    <NavLink to="/cart"><AiOutlineShoppingCart size={25} color={"#fff"}/></NavLink>

                                    <span>{cart?.length}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;