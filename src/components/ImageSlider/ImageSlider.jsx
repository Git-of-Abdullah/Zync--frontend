import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import "./ImageSlider.css";

const mediaUrls = [
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0", // Image 1
  "https://www.w3schools.com/html/mov_bbb.mp4", // Video 1
  "https://images.unsplash.com/photo-1521747116042-5a810fda9664", // Image 2
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", // Video 2
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc", // Image 3
];

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [mediaTypes, setMediaTypes] = useState({}); // Stores whether a URL is an image
  const totalSlides = mediaUrls.length;

  // Function to check if the URL is an image using HEAD request
  const isImage = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.headers.get("content-type").startsWith("image");
    } catch {
      return false;
    }
  };

  // Fetch media types on mount
  useEffect(() => {
    const fetchMediaTypes = async () => {
      const types = {};
      for (const url of mediaUrls) {
        types[url] = await isImage(url);
      }
      setMediaTypes(types);
    };

    fetchMediaTypes();
  }, []);

  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
      >
        {mediaUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="image-wrapper">
              {mediaTypes[url] === undefined ? (
                <p>Loading...</p> // Show loading while fetching
              ) : mediaTypes[url] ? (
                <img src={url} alt={`Slide ${index + 1}`} />
              ) : (
                <VideoPlayer src={url} />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="slide-counter">
        {currentSlide}/{totalSlides}
      </div>
    </div>
  );
};

export default ImageSlider;
