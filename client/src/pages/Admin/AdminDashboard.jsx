import React from 'react';
import Layout from "../../components/patternSite/Layout";
import AdminMenu from "../../components/patternSite/AdminMenu";
import {useAuth} from "../../context/auth";
import ScrollUp from "../../components/Scroll-up";

const AdminDashboard = () => {
    const [auth] = useAuth()
    return (
        <Layout>
            <div className="admin-panel-container-full">
                <div className="admin-panel-container">
                    <div className="">
                        <AdminMenu/>
                    </div>
                    <div className="">
                        <div className="admin-panel-category">
                            <div className="">
                                <h3>Имя администратора: {auth?.user?.name}</h3>
                                <h3>Почта администратора: {auth?.user?.email}</h3>
                                <h3>Телефон администратора: {auth?.user?.phone}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollUp/>
        </Layout>
    );
};

export default AdminDashboard;