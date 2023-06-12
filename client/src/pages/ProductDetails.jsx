import React, { useState, useEffect } from "react";
import Layout from "../components/patternSite/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {useCart} from "../context/cart";
import ScrollUp from "../components/Scroll-up";

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart,setCart] = useCart();

    //initalp details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);
    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    //получение похожий товаров
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout>
            <div className="details-container">
                <div className="details-photo">
                    <h6>{product.name}</h6>
                    <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        height="300"
                        width={"350px"}
                    />
                </div>
                <div className="product-detailsInfo">
                    <h6> <span>Цена</span> : {product.price} ₽</h6>
                    <h6 className='descriptionDetails'> <span>Категория</span> : {product?.category?.name}</h6>
                    <h6> <span>Описание</span> : {product.description}</h6>
                    <button className="buttonCart buttonCartDetails"
                            onClick={() => {
                                setCart([...cart, product])
                                localStorage.setItem('cart', JSON.stringify([...cart, product]))
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
            <hr />
            <div className="related-product">
                <h6 className='related-product-title'>Похожие товары</h6>
                {relatedProducts.length < 1 && (
                    <p className="text-center">Нет похожих товаров</p>
                )}
                <div className="product-item related-product">
                    {relatedProducts?.map((p) => (
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

export default ProductDetails;