import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/patternSite/Layout";
import {AiOutlineMail, AiOutlineQuestionCircle, AiOutlineUnlock} from "react-icons/ai";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password',
                {email,newPassword,answer}
            );
            if (res && res.data.success){
                toast.success(res.data && res.data.message);
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
        <Layout title='Востановление пароля'>
            <div className="register-container login-container">
                <form className="register-container-form forgot-container-form" onSubmit={handleSubmit}>
                    <h4 className="register-title">Восстановление пароля</h4>
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
                        <div className="register-input-form">
                            <label form="exampleInputNewPassword1">Ваше пароль</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className=""
                                id="exampleInputPassword1"
                                placeholder="123456789"
                                required
                            />
                            <AiOutlineUnlock className="register-icon" fontSize={25} color="#797979"/>
                        </div>
                    </div>

                    <div className="register-input">
                        <button type="submit" className="register-input-btn register-input-btn-forgot">
                            Вход
                        </button>
                    </div>

                    <div className="register-link">
                        Ещё не зарегистрированы?
                        <NavLink to="/register" className="register-links">
                            Зарегистрируйтесь
                        </NavLink>
                    </div>
                </form>
            </div>


        </Layout>
    );
};

export default ForgotPassword;