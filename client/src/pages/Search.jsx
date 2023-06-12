import React from "react";
import Layout from "../components/patternSite/Layout";
import { useSearch } from "../context/search";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useCart} from "../context/cart";
import ScrollUp from "../components/Scroll-up";

const Search = () => {
    const [cart,setCart] = useCart();
    const navigate = useNavigate();
    const [values, setValues] = useSearch();
    return (
        <Layout title={"Результаты поиска"}>
            <div className="">
                <div className="text-center">
                    <h1>Результаты поиска</h1>
                    <h6>
                        {values?.results.length < 1
                            ? "Товары не найдены"
                            : `Результаты: ${values?.results.length}`}
                    </h6>
                    <div className="product-item product-itemSearch">
                        {values?.results.map((p) => (
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
                                    <h5 className="product-name product-nameSearch">{p.name}</h5>
                                    <p className="product-description product-descriptionSearch">
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <div className='price-and-button'>
                                        <p className="product-price">{p.price}  ₽</p>
                                        <button className="buttonCart"
                                                onClick={() => {
                                                    setCart([...cart, p])
                                                    localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                                    toast.success('Товар добавлен в корзину')
                                                }}
                                        >В корзину</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ScrollUp/>
        </Layout>
    );
};

export default Search;