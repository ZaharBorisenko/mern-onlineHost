import React, {useState, useEffect} from 'react';
import Layout from "../components/patternSite/Layout";
import {useCart} from "../context/cart";
import {useAuth} from "../context/auth";
import {useNavigate} from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import ScrollUp from "../components/Scroll-up";
import CartClear from "../components/CartClear";
const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("ru", {
                style: "currency",
                currency: "RUB",
            });
        } catch (error) {
            console.log(error);
        }
    };

    //удаление товара из корзины
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    //токен для оплаты
    const getToken = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/braintree/token");
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getToken();
    }, [auth?.token]);

    //handle payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("/api/v1/product/braintree/payment", {
                nonce,
                cart,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Оплата успешна произведена");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Layout title="Sweet-day | Корзина">
            <div className="cart-container">
                <div className="">
                    <div className="">
                        {/*<h4 className="">*/}
                        {/*    {*/}
                        {/*        `Добро пожаловать в корзину, ${auth?.token && auth?.user?.name}`*/}
                        {/*    }*/}
                        {/*</h4>*/}
                        <h4 className="cart-count-product">
                            {cart?.length
                                ? `Вы добавили ${cart.length} товара ${
                                    auth?.token ? "" : "пожалуйста, войдите в систему для оформления заказа"
                                }`
                                : <CartClear/>

                            }
                        </h4>
                        <hr className="hr"/>
                    </div>
                </div>
                <div className="cart-container-info">
                    <div className="">
                        <div className="cart-pruduct-container">
                            {
                                cart?.map(p => (
                                    <div key={p._id} className='cart-pruduct'>
                                        <div className=''>
                                            <img
                                                src={`/api/v1/product/product-photo/${p._id}`}
                                                className=""
                                                alt={p.name}
                                                width='250px'
                                                height='250px'
                                            />
                                        </div>
                                            <div className="cart-info-left">
                                                <h4 className="cart-name">{p.name}</h4>
                                                <p className="cart-desc">{p.description}</p>
                                            </div>
                                            <div className="cart-info-right">
                                                <p  className="cart-price">{p.price} ₽</p>
                                                <div>
                                                    <button
                                                        className='btnDelCart'
                                                        onClick={() => removeCartItem(p._id)}
                                                    >
                                                        <AiOutlineDelete fontSize={30}/>
                                                    </button>
                                                </div>
                                            </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="">
                        <h4 className="cart-price cart-price-right">Всего к оплате: {totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="">
                                    <h4>Адрес доставки: {auth?.user?.address}</h4>
                                    <button
                                        className="btnUpdate"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Обновить адрес
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="">
                                {auth?.token ? (
                                    <button
                                        className="btnUpdate"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Обновить адрес
                                    </button>
                                ) : (
                                    <button
                                        className="btnUpdate"
                                        onClick={() =>
                                            navigate("/login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Войдите, чтобы продолжить
                                    </button>
                                )}
                            </div>
                        )}
                        <div className="">
                            {!clientToken || !cart?.length ? (
                                ""
                            ) : (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: "vault",
                                            },
                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                    />

                                    <button
                                        className="btnUpdate btnPay"
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                    >
                                        {loading ? "Processing ...." : "Оплатить"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ScrollUp/>
        </Layout>
    );
};

export default CartPage;