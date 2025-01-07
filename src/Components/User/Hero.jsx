import React, { useEffect, useState } from "react";
import Doctor from "../Assets/object.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();
    const [goUp, setGoUp] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBookAppointmentClick = () => {
        navigate("/manga");
    };

    useEffect(() => {
        const onPageScroll = () => {
            setGoUp(window.scrollY > 600);
        };
        window.addEventListener("scroll", onPageScroll);
        return () => window.removeEventListener("scroll", onPageScroll);
    }, []);

    return (
        <>
            <style>
                {`
                .hero-section {
                    padding: 32px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 24px;
                    background: #e69c0a;
                }
                .text-section {
                    width: 60%;
                    padding: 0 32px;
                }
                .text-title {
                    color: white;
                    font-family: 'Poppins', sans-serif;
                    font-size: 60px;
                    font-weight: bold;
                    margin-left: 100px;
                }
                .text-description {
                    margin: 32px 0;
                    color: white;
                    font-family: 'Rubik', sans-serif;
                    font-size: 25px;
                    letter-spacing: .7px;
                    line-height: 1.6rem;
                    margin-left: 100px;
                }
                .text-appointment-btn {
                    padding: 20px 160px;
                    margin-left: 100px;
                    color: #33437C !important;
                    border: 2px solid #33437C !important;
                    border-radius: 10px;
                    background-color: white !important;
                    font-size: 25px;
                    font-weight: bold;
                    font-family: 'Rubik', sans-serif;
                    letter-spacing: .8px;
                    cursor: pointer;
                    transition: all .4s ease;
                }
                .text-appointment-btn:hover {
                    background-color: #33437C;
                    color: white !important;
                }
                .hero-image-section {
                    width: 50%;
                    text-align: center;
                }
                .hero-image1 {
                    width: 100%;
                    height: auto;
                }
                .scroll-up {
                    width: 45px;
                    height: 45px;
                    display: none;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    border: 3px solid white;
                    border-radius: 50%;
                    background-color: #1A8EFD;
                    position: fixed;
                    bottom: 50px;
                    right: 50px;
                    font-size: 24px;
                    cursor: pointer;
                }
                .show-scroll {
                    display: flex;
                }
                @media screen and (max-width: 900px) {
                    .hero-image-section {
                        display: none;
                    }
                    .text-section {
                        width: 100%;
                        padding: 0;
                    }
                }
                @media screen and (max-width: 600px) {
                    .text-title {
                        font-size: 28px;
                    }
                    .text-description {
                        font-size: 16px;
                    }
                    .text-appointment-btn {
                        font-size: 16px;
                    }
                    .scroll-up {
                        bottom: 32px;
                        right: 32px;
                    }
                }
                `}
            </style>
            <div className="section-container">
                <div className="hero-section">
                    <div className="text-section">
                        <h2 className="text-title">
                        Откройте мир захватывающей манги!
                        </h2>
                        <p className="text-description">
                        Добро пожаловать в наш каталог манги, где собраны сотни увлекательных серий и жанров на любой вкус. Здесь вы найдете популярные и редкие тайтлы, от драматических историй до захватывающих приключений, романтики и фэнтези. Погрузитесь в мир манги вместе с нами и найдите свою следующую любимую серию!
                        </p>
                        <button
                            className="text-appointment-btn"
                            onClick={handleBookAppointmentClick}
                        >
                            <FontAwesomeIcon icon={faCalendarCheck} /> Перейти к каталогу
                        </button>
                    </div>
                    <div className="hero-image-section">
                        <img src={Doctor} alt="Doctor" className="hero-image1" />
                    </div>
                </div>
                <div
                    onClick={scrollToTop}
                    className={`scroll-up ${goUp ? "show-scroll" : ""}`}
                >
                    <FontAwesomeIcon icon={faAngleUp} />
                </div>
            </div>
        </>
    );
}

export default Hero;
