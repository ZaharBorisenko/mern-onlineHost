import React from 'react';
import Layout from "../components/patternSite/Layout";
import { Link } from "react-router-dom";
const PagenotFound = () => {
    return (
        <Layout title='Страница не найдена'>
            <div className="pnf-container">
                <h1 className="pnf-title">Ничего не найдено 😕</h1>
                <h5 className="pnf-heading">К сожалению данная страница отсутствует в нашем интернет-магазине</h5>
                <div className="pnf-btn">
                    <Link to="/" className="btnUpdate btnGoBack">
                        На главную страницу
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default PagenotFound;