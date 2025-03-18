import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import { Time, Rating, Location } from "../utils/Icons";
import { getRatingColorClass } from "../utils/miscellaneous";


const RestaurantCard = (props) => {
    const { resData } = props
    const { cloudinaryImageId, name, costForTwo, cuisines, sla, avgRating, avgRatingString } = resData?.info

    return (
      <div className="my-4 mx-4 w-72 p-4 bg-[#f7f4f4w] hover:bg-slate-100 shadow-lg hover:shadow-2xl rounded-lg transition-transform transform hover:scale-105">
        <div className=" h-40 w-full overflow-hidden">
          <img 
            className="w-full h-full object-cover rounded-lg"
            src={ CDN_URL + cloudinaryImageId }
            alt='Restaurant Card'
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
            <span className="pb-1 mx-1 text-gray-700 font-bold"><Time /> {sla.slaString}</span>
          </div>
        </div>
      </div> )
  }

  export const withPromotedLabel = (RestaurantCard) => {
    return (props) => {
      return (
        <div className="relative transition-transform transform hover:scale-105">
          <label className="absolute top-0 left-0 bg-green-700 text-white m-1 px-2 py-1 rounded-lg z-10">Open</label>
          <RestaurantCard  {...props}/>
        </div>
      )
    } 
  }

  export default RestaurantCard;