import { GetPlaceDetails, } from '@/service/globalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UserTripCard = ({ trip }) => {
    // const [photoUrl, setPhotoUrl] = useState()


    // useEffect(() => {
    //     trip && GetPlacePhoto();
    // }, [trip])

    // const GetPlacePhoto = async () => {
    //     const data = {
    //         textQuery: trip?.userSelection?.location?.label
    //     }
    //     const result = await GetPlaceDetails(data).then(resp => {
    //         console.log(resp.data.places[0].photo[3].name);

    //         const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photo[3].name)
    //         console.log(photoUrl)
    //         setPhotoUrl(photoUrl)
    //     })
        return (
            <Link to={'/view-trip/'+trip?.id}>
            <div className='hover:scale-105 transition-all'>
                <img src={"/placeholder.webp"} alt="" className='object-cover rounded-xl h-[220px]' />

                <div>
                    <h2 className='font-bold text-lg text-center'>
                        {trip?.userSelection?.location?.label}
                    </h2>
                    <h2 className='text-sm text-gray-500 text-center'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget </h2>
                </div>
            </div>
            </Link>
        )
    }

export default UserTripCard
