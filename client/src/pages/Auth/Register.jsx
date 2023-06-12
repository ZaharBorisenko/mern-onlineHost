import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css"
import Layout from "../../components/patternSite/Layout";

import { AiOutlineUser, AiOutlineMail,AiOutlinePhone,AiOutlineHome,AiOutlineQuestionCircle,AiOutlineUnlock } from "react-icons/ai";
import ScrollUp from "../../components/Scroll-up";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [answer, setAnswer] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register',
                {name,email,password,phone,address,answer}
            );
            if (res && res.data.success){
                toast.success(res.data.message)
                navigate('/login');
            }else {
                toast.error(res.data.message)
            }
        }catch (error) {
            console.log(error);
            toast.error('что то пошло не так...');
        }
    }

    return (
        <Layout title="Регистрация | Sweet-day">
            <div className="register-container">
                <form className="register-container-form" onSubmit={handleSubmit}>
                    <h4 className="register-title">Регистрация</h4>
                    <div className="register-link">
                        Уже зарегистрированы?
                        <NavLink to="/login" className="register-links">
                            Войдите
                        </NavLink>
                    </div>
                    <div className="register-input">
                        <div className="register-input-form">
                            <label form="exampleInputName1">Ваше имя</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className=""
                                id="exampleInputName1"
                                placeholder="Захар"
                                required
                                autoFocus
                            />
                            <AiOutlineUser className="register-icon" fontSize={25} color="#797979"/>
                        </div>
                    </div>
                    <div className="register-input">
                        <div className="register-input-form">
                            <label form="exampleInputEmail1">Ваше email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className=""
                                id="exampleInputEmail1"
                                placeholder="xxx@gmail.com"
                                required
                            />
                            <AiOutlineMail className="register-icon" fontSize={25} color="#797979"/>
                        </div>
                    </div>
                    <div className="register-input">
                        <div className="register-input-form">
                            <label form="exampleInputPassword1">Ваше пароль</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className=""
                                id="exampleInputPassword1"
                                placeholder="123456789"
                                required
                            />
                            <AiOutlineUnlock className="register-icon" fontSize={25} color="#797979"/>
                        </div>
                    </div>
                    <div className="register-input">
                        <div className="register-input-form">
                            <label form="exampleInputPhone1">Ваше телефон</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className=""
                                id="exampleInputPhone1"
                                placeholder="+79339924582"
                                required
                            />
                            <AiOutlinePhone className="register-icon" fontSize={25} color="#797979"/>
                        </div>
                    </div>
                    <div className="register-input">
                        <div className="register-input-form">
                            <label form="exampleInputAddress1">Ваш адрес</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className=""
                                id="exampleInputAddress1"
                                placeholder="Малая Ивановская 60"
                                required
                            />
                            <AiOutlineHome className="register-icon" fontSize={25} color="#797979"/>
                        </div>
                    </div>
                    <div className="register-input">
                        <div className="register-input-form">
                            <label form="exampleInputAnswer1">Кодовое слово</label>
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className=""
                                id="exampleInputAnswer1"
                                placeholder="Например, имя вашего питомца"
                                required
                            />
                            <AiOutlineQuestionCircle className="register-icon" fontSize={25} color="#797979"/>
                        </div>
                    </div>
                    <div className="register-input">
                        <button type="submit" className="register-input-btn">
                            Регистрация
                        </button>
                    </div>
                </form>
            </div>

            <ScrollUp/>
        </Layout>
    );
};

export default Register;