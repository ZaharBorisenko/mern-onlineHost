import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import {comparePassword, hashPassword} from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";

export const registerController = async (req,res) => {
    try {
        const { name, email, password, phone, address,answer } = req.body;
        //проверки
        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        if (!answer) {
            return res.send({ message: "answer is Required" });
        }
        //проверка пользователя по емайлу
        const exisitingUser = await userModel.findOne({ email });
        //проверка на существующих пользователей
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Вы уже зарегистрировались",
            });
        }
        //хеш пароль
        const hashedPassword = await hashPassword(password);
        //сохранить
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer
        }).save();

        res.status(201).send({
            success: true,
            message: "Пользователь успешно зарегистрировался",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Ошибка при регистрации",
            error,
        });
    }
};

//ПОСЛЕ ВХОДА В СИСТЕМУ
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Неверный адрес электронной почты или пароль",
            });
        }
        //проверьте пользователя
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Адрес электронной почты не зарегистрирован",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Неверный пароль",
            });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "Вход в систему успешно выполнен",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Ошибка при входе в систему",
            error,
        });
    }
}

//восстановление пароля.
export const forgotPasswordController = async (req,res) => {
    try {
        const {email,answer, newPassword} = req.body;
        if (!email){
            res.status(400).send({message: 'Требуется email...'})
        }
        if (!answer){
            res.status(400).send({message: 'Требуется ответ...'})
        }
        if (!newPassword){
            res.status(400).send({message: 'Требуется новый пароль...'})
        }
        const user = await userModel.findOne({email,answer})
        if (!user){
            return res.status(404).send({
                success:false,
                message: 'неправильный ответ или Email'
            });
        };
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message: 'Пароль успешно изменён'
        });
    }catch (error){
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Что то пошло не так...',
            error
        })
    }
}


//test controller
export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};

//обновить профиль
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Требуется пароль длиной 6 символов" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Профиль успешно отредактирован",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Ошибка редактирования профиля",
            error,
        });
    }
};

//заказ
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Ошибка при получении заказов",
            error,
        });
    }
};

//заказы
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: "-1" });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Ошибка при получении заказов",
            error,
        });
    }
};

//статус заказа
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Ошибка при обновлении заказа",
            error,
        });
    }
};