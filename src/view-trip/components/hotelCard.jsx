import { GetPlaceDetails, } from '@/service/globalApi'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCard = ({ hotel }) => {
    // const [photoUrl,setPhotoUrl] = useState()


    // useEffect(() => {
    //     hotel && GetPlacePhoto();
    // }, [hotel])

    // const GetPlacePhoto = async () => {
    //     const data = {
    //         textQuery: hotel?.hotelName
    //     }
    //     const result = await GetPlaceDetails(data).then(resp => {
    //         console.log(resp.data.places[0].photo[3].name);

    //         const photoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photo[3].name)
    //         console.log(photoUrl)
    //         setPhotoUrl(photoUrl)
    //     })
    return (
        <Link className='text-gray-500' to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + hotel?.hotelAddress} target='_blank'>
            <div className='hover:scale-105 hover:shadow-md pb-1 rounded-lg transition-all cursor-pointer'>
                <img src={"/placeholder.webp"} alt="" className='rounded-lg h-[180px] w-[full] object-cover' />

                <div className='text-center my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                    <h2 className='text-sm'>💰 {hotel?.price}</h2>
                    <h2 className='text-sm'>⭐ {hotel?.ratings} stars</h2>
                </div>
            </div>
        </Link>
    )
}
export default HotelCard
