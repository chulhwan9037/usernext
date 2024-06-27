"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function MainPage() {
    const images = [
        '/main_img/img1.jpeg',
        '/main_img/img2.jpeg',
        '/main_img/img3.jpeg'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 503000); // 3초마다 이미지 변경

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    }, [images.length]);

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '500px', height: '300px' }}>
                <Image 
                    src={images[currentImageIndex]} 
                    alt="Slideshow"
                    layout="fill" // 이미지가 부모 요소를 채우도록 설정
                    objectFit="cover" // 이미지가 컨테이너에 맞게 조정되도록 설정
                />
            </div>
        </div>
    );
}
