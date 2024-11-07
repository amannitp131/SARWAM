'use client'
import React, { useState, useEffect } from 'react';

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      src: 'https://alumini-nitp.vercel.app/images/bihtacampus/Maingate.jpeg',
      title: 'NITP New Campus',
      description: 'Our campus mess offers delicious meals, ensuring convenient dining for students and staff alike.',
    },
    {
      src: 'https://t3.ftcdn.net/jpg/03/38/74/34/240_F_338743488_z1D544tk6rCOWGA4ieq2jqZDoFFmGgc5.jpg',
      title: 'Let Be Together',
      description: 'Let come together in the mess, sharing meals, stories, and building friendships that last a lifetime',
    },
    {
      src: 'https://t3.ftcdn.net/jpg/04/66/42/80/240_F_466428003_A2yZmYBS8Q2ud4GK3YtZB3f3n5jvpi82.jpg',
      title: 'Hands of Hope',
      // description: 'NGO tackles food wastage in mess, promoting sustainability and sharing surplus meals with those in need.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{
            backgroundImage: `url(${slide.src})`,
          }}
        >
          <div className="overlay" />
          <div className="caption">
            <h3 className="hidden md:block text-white font-bold text-4xl lg:text-5xl">{slide.title}</h3>
            <p className="hidden md:block text-white p-6 rounded-lg text-shadow backdrop-blur-md opacity-90 font-semibold text-lg lg:text-xl">
              {slide.description}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="navigation">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Prev/Next Buttons */}
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>

      <style jsx>{`
        .slideshow-container {
          position: relative;
          max-width: 100%;
          height: 600px;
          overflow: hidden;
          margin: auto;
        }

        .slide {
          display: none;
          position: absolute;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: opacity 1s ease-in-out;
        }

        .slide.active {
          display: block;
          opacity: 1;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5); /* Dark overlay for contrast */
        }

        .caption {
          position: absolute;
          bottom: 30px;
          left: 20px;
          color: #fff;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.9);
          z-index: 1; /* Ensure caption is above overlay */
        }

        .navigation {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
        }

        .dot {
          height: 15px;
          width: 15px;
          margin: 0 5px;
          background-color: #bbb;
          border-radius: 50%;
          display: inline-block;
          transition: background-color 0.6s ease;
          cursor: pointer;
        }

        .dot.active {
          background-color: #717171;
        }

        /* Prev/Next buttons */
        .prev,
        .next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          border: none;
          padding: 16px;
          cursor: pointer;
          color: white;
          font-size: 24px;
          border-radius: 50%;
          transition: background-color 0.3s ease;
        }

        .prev:hover,
        .next:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }

        .prev {
          left: 10px;
        }

        .next {
          right: 10px;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .slideshow-container {
            height: 400px;
          }

          .caption h3 {
            font-size: 2rem;
          }

          .caption p {
            font-size: 1rem;
          }

          .prev,
          .next {
            padding: 12px;
            font-size: 18px;
          }
        }

        @media (max-width: 480px) {
          .slideshow-container {
            height: 300px;
          }

          .caption h3 {
            font-size: 1.5rem;
          }

          .caption p {
            font-size: 0.9rem;
          }

          .prev,
          .next {
            padding: 10px;
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}
