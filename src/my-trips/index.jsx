import { db } from '@/service/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserTripCard from './components/userTripCard'

const MyTrips = () => {
    const navigate = useNavigate()
    const [userTrips, setUserTrips] = useState([])
    useEffect(() => {
        getUserTrips()
    }, [])

    const getUserTrips = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            
            if (!user) {
                navigate('/')
                return
            }
    
            setUserTrips([]) // Clear previous trips
            const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email))
    
            const querySnapshot = await getDocs(q)
            // console.log(querySnapshot)
    
            const uniqueTripsMap = new Map()
            querySnapshot.forEach((doc) => {
                const trip = doc.data()
                const tripId = trip.id
                if (!uniqueTripsMap.has(tripId)) {
                    uniqueTripsMap.set(tripId, trip)
                }
            })
    
            setUserTrips(Array.from(uniqueTripsMap.values()))
        } catch (error) {
            console.error('Error fetching user trips:', error)
        }
    }
    
    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
                {userTrips.length>0?userTrips.map((trip,index)=>(
                    <UserTripCard trip={trip} key={index}/>
                ))
            :[1,2,3,4,5,6].map((item,index)=>(
                <div key={index} className='h-[220px] w-[full] bg-slate-200 animate-pulse rounded-xl'>

                </div>
            ))
            }
            </div>
        </div>
    )
}

export default MyTrips
