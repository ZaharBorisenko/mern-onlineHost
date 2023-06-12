import React, { useState, useEffect } from "react";
import Layout from "../components/patternSite/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {useCart} from "../context/cart";
import ScrollUp from "../components/Scroll-up";
import Skeleton from "../components/Skeleton";
const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart,setCart] = useCart();
    const [isLoading, setIsLoading] = React.useState(true)
    useEffect(() => {
        if (params?.slug) getPrductsByCat();
    }, [params?.slug]);
    const getPrductsByCat = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/product-category/${params.slug}`
            );
            setProducts(data?.products);
            setCategory(data?.category);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="container mt-3">
                <h4 className="text-center">Категория - {category?.name}</h4>
                <h6 className="text-center">{products?.length} результаты: </h6>
                <div className="">
                    <div className="category-container">
                        <div className="product-item product-category">
                            {isLoading
                                ?[... new Array(6)].map((_,index) => <Skeleton key={index}/>)
                                : products?.map((p) => (
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

                                ))
                            }
                        </div>
                        {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
                    </div>
                </div>
            </div>

            <ScrollUp/>
        </Layout>
    );
};

export default CategoryProduct;