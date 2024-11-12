import React from 'react'
import PlaceCard from './placeCard'

const DailyPlaces = ({ trip }) => {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5 mb-2'>Places to visit</h2>
            <div>
                {trip.tripData?.itinerary?.map((item, index) => (
                    <div>
                        <h2 className='font-medium text-lg'>{item.day}</h2>
                        <div className='grid grid-cols-2 gap-5' >
                            {item.plan.map((place, index) => (
                                <div className='my-3'>
                                    <PlaceCard place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DailyPlaces
