import React,{useState,useEffect} from 'react';
import Layout from "../components/patternSite/Layout";
import axios from "axios";
import {Checkbox,Radio} from "antd";
import {Prices} from "../components/PriceForFilter.jsx";
import {useNavigate} from "react-router-dom";
import {useCart} from "../context/cart";
import toast from "react-hot-toast";
import SearchInput from "../components/Form/SearchInput";
import ScrollUp from "../components/Scroll-up";
import Skeleton from "../components/Skeleton";

const ProductPage = () => {
    const navigate = useNavigate();
    const [cart,setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = React.useState(true)

    //Полная стоимость товаров в корзине
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    //вывод категорий
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllCategory()
        getTotal()
    }, []);

    //получение товара
    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false)
            setProducts(data.products);
            setIsLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //загрузка товара
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    //фильтрация
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();

    }, [checked.length,radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct()
    }, [checked,radio]);

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title='Sweet-Day | Весь товар'>
            <div className="">
                <h1 className='product-title'>Меню</h1>

                {/*<div className="filter-categories-container">*/}
                {/*    <div className="filter-categories">*/}
                {/*        {categories?.map((c) => (*/}
                {/*            <label className='label-categories' key={c._id}>*/}
                {/*                <input*/}
                {/*                    type="checkbox"*/}
                {/*                    className='input-categories'*/}
                {/*                    onChange={(e) => handleFilter(e.target.checked, c._id)}*/}
                {/*                />*/}
                {/*                {c.name}*/}
                {/*            </label>*/}
                {/*        ))}*/}
                {/*    </div>*/}

                {/*</div>*/}

                <div className="menu-container">
                    <div className="filter-container">
                        <div className="filter-item">
                            <div className="filter-categories">
                                <h4 className="">Фильтрация <br/> по категориям:</h4>
                                {categories?.map((c) => (
                                    <Checkbox className='categories-chexbox'
                                              key={c._id}
                                              onChange={(e) => handleFilter(e.target.checked, c._id) }
                                    >
                                        {c.name}
                                    </Checkbox>
                                ))}
                            </div>
                            <div className="filter-price">
                                <h4 className="">Фильтрация <br/> по цене:</h4>
                                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                    {Prices?.map((p) => (
                                        <div key={p._id}>
                                            <Radio value={p.array}>{p.name}</Radio>
                                        </div>
                                    ))}
                                </Radio.Group>
                                <div className="">
                                    <button className='btnullFilter'
                                            onClick={() => window.location.reload()}>Сбросить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="product-item">
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

                    <div className="m-2 p-3">
                    </div>
                </div>
                <div className="text-center m-5">
                    {products && products.length < total && (
                        <button
                            className="btnLoading"
                            onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1);
                            }}
                        >
                            {loading ? "Загрузка ..." : "Ещё"}
                        </button>
                    )}
                </div>
            </div>

           <ScrollUp/>

        </Layout>
    );
};

export default ProductPage;