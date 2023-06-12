import React, {useState} from 'react';
import {useNavigate, useLocation, NavLink} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/patternSite/Layout";

import {useAuth} from "../../context/auth";
import {
    AiOutlineUser,
    AiOutlineMail,
    AiOutlineUnlock,
    AiOutlinePhone,
    AiOutlineHome,
    AiOutlineQuestionCircle
} from "react-icons/ai";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login',
                {email,password}
            );
            if (res && res.data.success){
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token,
                });
                localStorage.setItem('auth',JSON.stringify(res.data));
                navigate( location.state  || '/');
            }else {
                toast.error(res.data.message)
            }
        }catch (error) {
            console.log(error);
            toast.error('что то пошло не так...');
        }
    }
    return (
        <div>
            <Layout title="Войти | Sweet-day">
                <div className="register-container login-container">
                    <form className="register-container-form login-container-form" onSubmit={handleSubmit}>
                        <h4 className="register-title">Войти</h4>
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

                        <div className="forgot-password">
                            <div className="forgot-password-text" onClick={() => {navigate('/forgot-password')}}>
                                Забыли пароль?
                            </div>
                        </div>

                        <div className="register-input">
                            <button type="submit" className="register-input-btn">
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
        </div>
    );
};

export default Login;