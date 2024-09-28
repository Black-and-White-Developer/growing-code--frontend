import './Links.css';
import React, { useEffect, useState } from 'react'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import new1 from './assets/new1.jpg';
import new2 from './assets/new2.png';
import new3 from './assets/new3.png';

const Links = () => {
    const [cardData, setCardData] = useState([]); 

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

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const response = await fetch('http://3.38.223.198:8080/links', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNzU0NDQzMywiZXhwIjoxNzI5MzQ0NDMzfQ.nOfIauv_Dw6W6WHelJOW4pVyO1Nh8L2g83tIZdvPCYA',
                    },
                });

                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다');
                }

                const data = await response.json();
                const formattedData = data.links.map((link, index) => {
                    const videoId = link.split('/').pop();
                    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

                    return {
                        id: index + 1,
                        title: `추천 ${index + 1}`,
                        url: link,
                        thumbnail: thumbnailUrl,
                    };
                });

                setCardData(formattedData); 
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
                setCardData([]); 
            }
        };

        fetchCardData();
    }, []); 

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
                                    <img src={card.thumbnail} alt={card.title} className="cardThumbnail" />
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
