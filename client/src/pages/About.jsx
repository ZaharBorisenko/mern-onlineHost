import React from 'react';
import Layout from "../components/patternSite/Layout";
import clients from '../img/contact.png'
import ScrollUp from "../components/Scroll-up";
const About = () => {
    return (
        <Layout title='Sweet-Day | О нас'>
            <div className="aboutUs-title">О компании</div>

            <div className="parentAboutUs">
                <div className="div1">
                    <div className="parentAboutUs-title">3 года</div>
                    <div className="parentAboutUs-text">Выпекаем торты для людей</div>
                </div>
                <div className="div2">
                    <div className="parentAboutUs-title">674 заказа</div>
                    <div className="parentAboutUs-text">Было выполнено за последние два месяца, не было ни одного возврата</div>
                </div>
                <div className="div3">
                    <div className="parentAboutUs-title">Высочайшее качество</div>
                    <div className="parentAboutUs-text">Мы работаем только с самыми проверенными поставщиками продукции</div>
                </div>
                <div className="div4">
                    <div className="parentAboutUs-title">4,95 из 5</div>
                    <div className="parentAboutUs-text">Такая наша средняя оценка на сайтах которые специализируются в оценках различных заведений</div>
                </div>
                <div className="div5">
                    <div className="parentAboutUs-title">В двойном размере</div>
                    <div className="parentAboutUs-text">Вернём плату, если товар не будет соответствовать описанию или фотографии товара на сайте</div>
                </div>
            </div>
            <ScrollUp/>
        </Layout>
    );
};

export default About;