import React,{useState, useEffect} from 'react';
import Layout from "../../components/patternSite/Layout";
import UserMenu from "../../components/patternSite/UserMenu";
import {useAuth} from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import {NavLink} from "react-router-dom";
import {
    AiOutlineHome,
    AiOutlineMail,
    AiOutlinePhone,
    AiOutlineQuestionCircle,
    AiOutlineUnlock,
    AiOutlineUser
} from "react-icons/ai";
import ScrollUp from "../../components/Scroll-up";

const Profile = () => {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //get user data
    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
    }, [auth?.user]);

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/api/v1/auth/profile", {
                name,
                email,
                password,
                phone,
                address,
            });
            if (data?.errro) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Профиль успешно обновлен");
            }
        } catch (error) {
            console.log(error);
            toast.error("Что то пошло не так");
        }
    };
    return (
        <Layout title={"Your Profile"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>

                    <div className="register-container profile-container col-md-7">
                        <form className="register-container-form profile-container-form" onSubmit={handleSubmit}>
                            <h4 className="register-title">Ваши данные</h4>
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
                                <button type="submit" className="register-input-btn">
                                    Обновить информацию
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ScrollUp/>
        </Layout>
    );
};

export default Profile;