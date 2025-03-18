import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Rating, Time } from '../utils/Icons';
import { CDN_URL } from '../utils/constants';
import { getRatingColorClass } from '../utils/miscellaneous';
import { Link } from "react-router-dom"
import CarouselSkeleton from '../skeletons/CarouselSkeleton'

const DishData = ({imageId, index}) => (
    <div
      className="w-36 flex flex-col cursor-pointer rounded-lg justify-center mx-5 my-3 flex-shrink-0 transition-transform transform hover:scale-110 hover:bg-slate-100"
    >
      <div className='h-full'>
        <img
          className="h-hull w-full object-cover rounded-lg"
          src={CDN_URL + imageId}
          alt={`Slide ${index}`}
        />
      </div>
    </div>
)

const ResData = ( {imageId, index, name, avgRating, avgRatingString, cuisines, costForTwo, time}) => (
    <div
      className="w-64 flex flex-col p-4 shadow-lg cursor-pointer rounded-lg justify-center mx-3 my-5 flex-shrink-0 transition-transform transform hover:scale-105 hover:bg-slate-100"
    >
      <div className='h-32'>
        <img
          className="h-full w-full object-cover rounded-lg"
          src={CDN_URL + imageId}
          alt={`Slide ${index}`}
        />
      </div>
      <div>
        <div className="line-clamp-1 py-2">
          <span className={`mx-1 pt-[1px] pb-[2px] px-[5px] inline-flex ${getRatingColorClass(avgRating)} rounded-lg text-white items-baseline font-semibold`}>{avgRatingString === "--" ? '4.0' : avgRatingString} <Rating /></span>
          <h3 className="font-bold py-1 mx-1 text-lg inline">{name}</h3>
        </div>
        <h4 className="pb-1 text-gray-500 mx-1 text-md line-clamp-1">{cuisines.join(', ')}</h4>
        <div className="flex justify-between">
          <span className="pb-1 mx-1 font-semibold text-gray-600">{costForTwo}</span>
          <span className="pb-1 mx-1 text-gray-700 font-bold"><Time /> {time}</span>
        </div>
      </div>
    </div>
)

const Carousel = ({ carouselData, type, isLoading }) => {
  const scrollContainerRef = useRef(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const handleScroll = (direction) => {
    const { current } = scrollContainerRef;
    if (current) {
      const scrollAmount = current.offsetWidth * 0.5;
      current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const updateButtonState = () => {
    const { current } = scrollContainerRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      // console.log(scrollLeft, scrollWidth, clientWidth)
      setIsPrevDisabled(scrollLeft <= 0);
      setIsNextDisabled(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  useEffect(() => {
    const { current } = scrollContainerRef;
    if (current) {
      updateButtonState();
      current.addEventListener('scroll', updateButtonState);
      return () => {
        current.removeEventListener('scroll', updateButtonState);
      };
    }
  }, [carouselData]);

  // console.log('Carousel Data: ', carouselData)
  if(isLoading){
    return <CarouselSkeleton type={type} />
  }

  return (
    <div className="w-full mb-5">
      <div className='flex items-center justify-between text-2xl font-extrabold'>
        <h1 className='mx-5'>{carouselData?.heading}</h1>
        <div className='flex items-center mx-5 my-1'>
          <button
            onClick={() => handleScroll('prev')}
            className={`text-xl mx-2 text-gray-800 bg-gray-300 bg-opacity-50 px-2 py-1 rounded-full transition duration-300  hover:bg-slate-200 shadow-lg ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#fe8b00] cursor-pointer'}`}
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => handleScroll('next')}
            className={`text-xl mx-2 text-gray-800 bg-gray-300 bg-opacity-50 px-2 py-1 rounded-full transition duration-300 hover:bg-slate-200 shadow-lg ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#fe8b00] cursor-pointer'}`}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex my-2 mr-[4%] transition-transform duration-500 ease-in-out no-scrollbar overflow-x-scroll overflow-y-hidden"
      >
        {carouselData?.data?.map((data, index) => (
          type === 'Dish' ? (
            <DishData
              key={data?.id}
              imageId={data?.imageId}
              index={index}
            />
          ) : (
           <Link key={data?.info?.id} to={'/restaurant/'+data?.info?.id}>
              <ResData
                imageId={data?.info?.cloudinaryImageId}
                index={index}
                name={data?.info?.name}
                avgRating={data?.info?.avgRating}
                avgRatingString={data?.info?.avgRatingString}
                cuisines={data?.info?.cuisines}
                costForTwo={data?.info?.costForTwo}
                time={data?.info?.sla?.slaString}
              />
            </Link>
          )
        ))}
      </div>
    </div>
  );
};

export default Carousel;
