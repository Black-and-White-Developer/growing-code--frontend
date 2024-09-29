
import './Links.css';
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import new1 from './assets/new1.jpg';
import new2 from './assets/new2.png';
import new3 from './assets/new3.png';

const Links = () => {
    const cardData = [
        { id: 1, title: "Card 1", url: "#" },
        { id: 2, title: "Card 2", url: "#" },
        { id: 3, title: "Card 3", url: "#" },
        { id: 4, title: "Card 4", url: "#" },
        { id: 5, title: "Card 5", url: "#" }
    ];

    const newsData = [
        { id: 1, image: new1 },
        { id: 2, image: new2 }, 
        { id: 3, image: new3 }
    ];

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const cardSliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div className="backgroundContainer">
            <div className="newsSection">
                <h2>오늘의 씨앗 뉴스</h2>
                <Slider {...sliderSettings}>
                    {newsData.map((news) => (
                        <div key={news.id} className="newsCard">
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src={news.image} alt={news.title} className="newsImage" />
                                <div className="newsContent">
                                    <h3>{news.title}</h3>
                                </div>
                            </a>
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="cardSlider">
                <h2>사용자 맞춤 추천 영상</h2>
                <Slider {...cardSliderSettings}>
                    {cardData.map((card) => (
                        <div key={card.id} className="card">
                            <a href={card.url} target="_blank" rel="noopener noreferrer">
                                <div className="cardContent">
                                    <h3>{card.title}</h3>
                                </div>
                            </a>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Links;
