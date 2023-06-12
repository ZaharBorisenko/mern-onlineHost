import React, {useEffect, useState} from 'react';
import { AiOutlineArrowUp } from "react-icons/ai";
const ScrollUp = () => {
    const [backToTopButton, setBackToTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setBackToTopButton(true)
            }else {
                setBackToTopButton(false)
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <div>
            {backToTopButton && (
                <button title="Вверх!" className="backToTopButton"
                    onClick={scrollUp}
                >
                    <AiOutlineArrowUp size={40} color={"#ff5f00"}/>
                </button>
            )}
        </div>
    );
};

export default ScrollUp;