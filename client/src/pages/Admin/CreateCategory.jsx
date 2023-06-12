import React, {useEffect, useState} from 'react';
import AdminMenu from "../../components/patternSite/AdminMenu";
import Layout from "../../components/patternSite/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import {Modal} from 'antd'
import ScrollUp from "../../components/Scroll-up";

const CreateCategory = () => {
    const [categories,setCategories] = useState([]);
    const [name,setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName,setUpdatedName] = useState("");

    //handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/category/create-category", {
                name,
            });
            if (data?.success) {
                toast.success(`${name} создано`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("что-то пошло не так в форме ввода");
        }
    };

    //вывод всех категорий
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Что-то пошло не так при получении категории");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //обнавление категорий
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data.success) {
                toast.success(`${updatedName} обновлено`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        }catch (error) {
            toast.error('Что то пошло не так')
        }
    }

    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `/api/v1/category/delete-category/${pId}`
            );
            if (data.success) {
                toast.success(`категория удалена`);

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Что то пошло не так");
        }
    };

    return (
        <Layout title={'Админ панель | Категории'}>
            <div className="admin-panel-container-full">
                <div className="admin-panel-container">
                    <div className="">
                        <AdminMenu/>
                    </div>
                    <div className="">
                        <div className="">
                            <h1>Управление категориями</h1>
                            <div className="container-inputcategory">
                                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                            </div>
                            <div className="">
                                <table className="">
                                    <thead>
                                    <tr>
                                        <th scope="col">Имя</th>
                                        <th scope="col">Действия</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {categories?.map(c => (
                                        <>
                                            <tr className="pb-10">
                                                <td className="pb-1" key={c._id}>{c.name}</td>
                                                <td className="pb-1">
                                                    <button
                                                        className="btnDeleteCreate btn btn-primary"
                                                        onClick={() => {
                                                            setVisible(true);
                                                            setUpdatedName(c.name);
                                                            setSelected(c);
                                                        }}
                                                    >
                                                        Изменить
                                                    </button>
                                                    <button className='btnDeleteCreate btn btn-danger' onClick={() => {handleDelete(c._id)}}>Удалить</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                    </Modal>
                </div>
            </div>

            <ScrollUp/>
        </Layout>
    );
};

export default CreateCategory;