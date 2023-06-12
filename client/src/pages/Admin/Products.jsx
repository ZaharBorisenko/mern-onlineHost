import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/patternSite/AdminMenu";
import Layout from "../../components/patternSite/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ScrollUp from "../../components/Scroll-up";
const Products = () => {
    const [products, setProducts] = useState([]);

    //getall products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product");
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Что то пошло не так");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <Layout>
            <div className="admin-panel-container-full">
             <div className="admin-panel-container">
                 <div className="">
                     <AdminMenu />
                 </div>
                 <div className="">
                     <h1 className="text-center">Все товары</h1>
                     <div className="d-flex flex-wrap">
                         {products?.map((p) => (
                             <Link
                                 key={p._id}
                                 to={`/dashboard/admin/product/${p.slug}`}
                                 className="product-link"
                             >
                                 <div className="card m-2" style={{ width: "18rem" }}>
                                     <img
                                         src={`/api/v1/product/product-photo/${p._id}`}
                                         className="card-img-top"
                                         alt={p.name}
                                     />
                                     <div className="card-body">
                                         <h5 className="card-title">{p.name}</h5>
                                         <p className="card-text">{p.description}</p>
                                         <p className="card-text">{p.price} ₽</p>
                                     </div>
                                 </div>
                             </Link>
                         ))}
                     </div>
                 </div>
             </div>
            </div>

            <ScrollUp/>
        </Layout>
    );
};

export default Products;