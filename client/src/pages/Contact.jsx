import React from 'react';
import Layout from "../components/patternSite/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import ScrollUp from "../components/Scroll-up";
const Contact = () => {
    return (
        <Layout title='Sweet-Day | Контакты'>
            <div className="contact-title">Контакты</div>
            <div className="contact-container">
                <div className="contact-content">
                    <div className="contact-content-items">
                        <div className="contact-content-address">
                            <div className="contact-content-address-title">АДРЕС</div>
                            <div className="contact-content-address-text">
                                Россия,<br/> г.Омск Ленина 24
                            </div>
                        </div>

                        <div className="contact-content-address">
                            <div className="contact-content-address-title">СОЦСЕТИ</div>
                            <div className="contact-content-address-links">
                                <a className="contact-content-address-link" href="https://vk.com/3d_diver">VK</a>
                                <a className="contact-content-address-link" href="http://instagram.com/">Instagram</a>
                                <a className="contact-content-address-link" href="https://t.me/zaharWeb">Telegram</a>
                                <a className="contact-content-address-link" href="https://github.com/ZaharBorisenko">Github</a>
                            </div>
                        </div>

                        <div className="contact-content-address">
                            <div className="contact-content-address-title">ТЕЛЕФОН</div>
                            <div className="contact-content-address-text">
                                +7(904)3298598
                            </div>
                        </div>

                        <div className="contact-content-address">
                            <div className="contact-content-address-title">ТЕЛЕФОН</div>
                            <div className="contact-content-address-text">
                                zaharborisenko6@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1332.2861143887942!2d73.37615603011396!3d54.9784901267068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43aafe0427f96023%3A0x48d6e8695e82e48e!2z0YPQuy4g0JvQtdC90LjQvdCwLCAyNCwg0J7QvNGB0LosINCe0LzRgdC60LDRjyDQvtCx0LsuLCA2NDQwMjQ!5e0!3m2!1sru!2sru!4v1684163142921!5m2!1sru!2sru"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
            <ScrollUp/>
        </Layout>
    );
};

export default Contact;