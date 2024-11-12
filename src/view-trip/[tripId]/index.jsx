import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/infoSection';
import Hotels from '../components/hotels';
import DailyPlaces from '../components/dailyPlaces';
import Footer from '../components/footer';

const ViewTrip = () => {

  const {tripId}=useParams();
  const [trip, setTrip] = useState([])


  useEffect(()=>{
    tripId&&getTripData()

  },[tripId])
  const getTripData = async()=>{
    const docRef = doc(db,'AITrips',tripId)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      console.log('document:',docSnap.data())
      setTrip(docSnap.data())
    }
    else{
      console.log('no data found')
      toast('No Trip found !!')
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* infirmation section */}

      <InfoSection trip={trip}/>

      {/* reccomended hotel */}

      <Hotels trip={trip}/>

      {/* daily plan */}

      <DailyPlaces trip={trip}/>

      {/* foooter */}

      <Footer trip={trip}/>
    </div>
  )
}

export default ViewTrip
