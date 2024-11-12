import { Button } from '@/components/ui/button'
import { GetPlaceDetails, } from '@/service/globalApi';
import React, { useEffect, useState } from 'react'
import { IoNavigateOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';


const PlaceCard = ({place}) => {
//   const [photoUrl,setPhotoUrl] = useState()


//     useEffect(() => {
//         place && GetPlacePhoto();
//     }, [place])

//     const GetPlacePhoto = async () => {
//         const data = {
//             textQuery: place.placeName
//         }
//         const result = await GetPlaceDetails(data).then(resp => {
//             console.log(resp.data.places[0].photo[3].name);

//             const photoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photo[3].name)
//             console.log(photoUrl)
//             setPhotoUrl(photoUrl)
//         })
  return (
    <Link className='text-gray-800' to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 items-center hover:scale-105 transition-all hover:shadow-lg'>
        <img src={"/placeholder.webp"} alt="" className='w-[130px] h-[130px] rounded-xl object-cover' />
        <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='h-24 max-h-36'>{place.placeDetails}</p>
            <span className='font-medium text-lg'>Opening Time:</span>
            <span className='font-medium text-sm text-orange-600'>  {place.openingTime}</span>
            <h2>{place.ticketPricing}</h2>
            <Button className='flex mt-1'> <IoNavigateOutline />
            </Button>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCard
