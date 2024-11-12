import { Button } from '@/components/ui/button'
import { GetPlaceDetails} from '@/service/globalApi';
import React, { useEffect, useState } from 'react'
import { FiSend } from "react-icons/fi";



const InfoSection = ({ trip }) => {
    // const [placeDetails, setPlaceDetails] = useState(null);
    // const [error, setError] = useState(null);
    // const [photoUrl,setPhotoUrl] = useState()


    // useEffect(() => {
    //     trip && GetPlacePhoto();
    // }, [trip])

    // const GetPlacePhoto = async () => {
    //     const data = {
    //         textQuery: trip?.userSelection?.location?.label
    //     }
    //     const result = await GetPlaceDetails(data).then(resp => {
    //         console.log(resp.data.places[0].photo[3].name);

    //         const photoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photo[3].name)
    //         console.log(photoUrl)
    //         setPhotoUrl(photoUrl)
    //     })
        return (
            <div>
                <img src={"/placeholder.webp"} alt="" className='h-[340px] w-full object-cover rounded-xl' />

                <div className='flex justify-between items-center'>
                    <div className='my-5 flex flex-col gap-2'>
                        <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                        <div className='flex gap-5'>
                            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg '>📅{trip?.userSelection?.noOfDays} Days</h2>
                            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>💸{trip?.userSelection?.budget} Budget</h2>
                            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>🧑{trip?.userSelection?.people} People</h2>
                        </div>
                    </div>
                    <Button><FiSend /></Button>
                </div>
            </div>
        )
    }

export default InfoSection
