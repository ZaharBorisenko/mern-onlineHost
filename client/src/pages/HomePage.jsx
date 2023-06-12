import React,{useState,useEffect} from 'react';
import Layout from "../components/patternSite/Layout";
import axios from "axios";
import {Checkbox,Radio} from "antd";
import {Prices} from "../components/PriceForFilter.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {useCart} from "../context/cart";
import toast from "react-hot-toast";
import SearchInput from "../components/Form/SearchInput";
// import homepageCofe from '../img/homepage-right.png'
import homePageLeft from '../img/homePageLeft.png'
import ScrollUp from "../components/Scroll-up";

const HomePage = () => {
    const navigate = useNavigate();
    const [cart,setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);

    const lastThreeProducts = products.slice(-3);
    //получение товара
    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false)
            setProducts(data.products);
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    };
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length,radio.length]);

    return (
        <Layout title='Sweet-Day | Главная страница'>

            <div className="homepage">
                <div className="homepage-container">
                    <div className="homepage-content">

                        <div className="">
                            <img src={homePageLeft} alt=""/>
                        </div>

                        <div className="homepage-content-right">
                            <div className="homepage-pre-title">Sweet-day</div>
                            <div className="homepage-pre-pre-title">Готовим с 2022 года</div>

                            <div className="homepage-title">Настоящая любовь</div>
                            <div className="homepage-subtitle">
                                Пирожные и другие десерты из натуральных ингредиентов, приготовленные с любовью
                            </div>
                            <NavLink to="/menu" className="homepage-content-btn">
                                В меню
                            </NavLink>
                        </div>

                    </div>
                </div>
            </div>
            <h1 className="newproduct-title">Новинки меню</h1>
            <div className="homepage-container">
                <div className="product-item product-item-new">
                    {lastThreeProducts?.map((p) => (
                        <div key={p._id} className="product-items">
                            <div className="container-product-img">
                                <img
                                    onClick={() => navigate(`/product/${p.slug}`)}
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="product-img"
                                    alt={p.name}
                                />
                            </div>
                            <div className="">
                                <h5 className="product-name">{p.name}</h5>
                                <p className="product-description">
                                    {p.description.substring(0, 30)}...
                                </p>
                                <div className='price-and-button'>
                                    <p className="product-price">{p.price}  ₽</p>
                                    <button className="buttonCart"
                                            onClick={() => {
                                                setCart([...cart, p])
                                                localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                                toast.success('Вы успешно добавили товар в корзину',{
                                                    duration:5000,
                                                    icon: '👏',
                                                    style :{
                                                        height: "50px",
                                                        backgroundColor: "#5d5dff",
                                                        color: "#fff",
                                                    },
                                                })
                                            }}
                                    >В корзину</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ScrollUp/>
        </Layout>
    );
};

export default HomePage;