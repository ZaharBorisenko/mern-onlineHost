import React,{useState,useEffect} from 'react';
import Layout from "../../components/patternSite/Layout";
import UserMenu from "../../components/patternSite/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from 'moment';
import ScrollUp from "../../components/Scroll-up";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);
    return (
        <Layout title={"Ваши заказы"}>
            <div className="container-flui p-3 m-3 dashboard">
                <div className="row">
                    <div className="col-md-3 orders-container">
                        <UserMenu />
                    </div>
                    <div className="col-md-8">
                        <h1 className="text-center">Все заказы</h1>
                        {orders?.map((o, i) => {
                            return (
                                <div className="border">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Статус</th>
                                            <th scope="col">Покупатель</th>
                                            <th scope="col">Дата</th>
                                            <th scope="col">Оплата</th>
                                            <th scope="col">Количество</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{o?.status}</td>
                                            <td>{o?.buyer?.name}</td>
                                            <td>{moment(o?.createAt).fromNow()}</td>
                                            <td>{o?.payment.success ? "Успешно" : "Провал"}</td>
                                            <td>{o?.products?.length}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        {o?.products?.map((p, i) => (
                                            <div className="" key={p._id}>
                                                <div className="orders-info">
                                                    <div className="">
                                                        <img
                                                            src={`/api/v1/product/product-photo/${p._id}`}
                                                            className="card-img-top"
                                                            alt={p.name}
                                                            width="250px"
                                                            height="250px"
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <p className="cart-name">{p.name}</p>
                                                        <p className="cart-price orders-price">{p.price} ₽</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <ScrollUp/>
        </Layout>
    );
};

export default Orders;