import React from 'react';
import Layout from "../../components/patternSite/Layout";
import UserMenu from "../../components/patternSite/UserMenu";
import {useAuth} from "../../context/auth";
import ScrollUp from "../../components/Scroll-up";

const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title='профиль'>
            <div className="container-flui m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu/>
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h3>Ваше имя: {auth?.user?.name}</h3>
                            <h3>Ваша почта: {auth?.user?.email}</h3>
                            <h3>Ваш телефон: {auth?.user?.phone}</h3>
                            <h3>Ваш адрес: {auth?.user?.address}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollUp/>
        </Layout>
    );
};

export default Dashboard;