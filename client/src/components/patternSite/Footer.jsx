import React from 'react';
import { Link,NavLink } from "react-router-dom";

import Vk from "../../img/FooterSocial/VK.png"
import Instagram from "../../img/FooterSocial/Instagram.png"
import Telegram from "../../img/FooterSocial/Telegram.png"
import Github from "../../img/FooterSocial/Github.png"
const Footer = () => {
    return (
        <footer className="footer">
            <ul className="social-icon">
                <li className="social-icon__item"><NavLink target="_blank" className="social-icon__link" to="https://vk.com/3d_diver">
                    <img className="social-icon__item-img"  src={Vk} alt="VK"/>
                </NavLink></li>
                <li className="social-icon__item"><NavLink target="_blank" className="social-icon__link" to="http://instagram.com/">
                    <img className="social-icon__item-img" src={Instagram} alt="Instagram"/>
                </NavLink></li>
                <li className="social-icon__item"><NavLink target="_blank" className="social-icon__link" to="https://t.me/zaharWeb">
                    <img className="social-icon__item-img" src={Telegram} alt="Telegram"/>
                </NavLink></li>
                <li className="social-icon__item"><NavLink target="_blank" className="social-icon__link" to="https://github.com/ZaharBorisenko">
                    <img className="social-icon__item-img" src={Github} alt="Github"/>
                </NavLink></li>
            </ul>
            <ul className="menu">
                <li className="menu__item"><NavLink className="menu__link" to="/">Главная страница</NavLink></li>
                <li className="menu__item"><NavLink className="menu__link" to="/about">О нас</NavLink></li>
                <li className="menu__item"><NavLink className="menu__link" to="/contact">Контакты</NavLink></li>
                <li className="menu__item"><NavLink className="menu__link" to="/policy">Наша политика</NavLink></li>
            </ul>
            <p>&copy;2023 Sweet-day | Все права защищены</p>
        </footer>
    );
};

export default Footer;