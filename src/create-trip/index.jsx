import React, { useState, useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "@/components/ui/input"
import { SelectBudgetOptions } from '@/constants/options';
import { SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { API_PROMPT, chatSession } from '@/service/AiModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';




function CreateTrip() {

  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])


  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user')
    if (!user) {
      setOpenDialog(true)
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.people || !formData?.noOfDays) {
      toast('Please Fill All the Details!!')
      return;
    }

    if (formData?.noOfDays > 15) {
      toast('Trips can be Maximum of 15 Days!!')
      return;
    }

    setLoading(true)
    const finalPrompt = API_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{noOfDays}', formData?.noOfDays)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{people}', formData?.people)
      .replace('{budget}', formData?.budget)


    const result = await chatSession.sendMessage(finalPrompt)
    setLoading(false)
    saveAiTrip(result?.response?.text())
  }

  const saveAiTrip = async (tripData) => {
    // Add a new document in collection "cities"

    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'))

    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false)
    navigate('/view-trip/'+docId)
  }

  const GetUserProfile = (tokenInfo) => {
    // Check if access token is available
    if (!tokenInfo?.access_token) {
      console.error('No access token available');
      return;
    }

    axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      }
    })
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip()
      })
      .catch((error) => {
        if (error.response) {
          // Handle 401 Unauthorized (Token issue)
          if (error.response.status === 401) {
            console.error('Unauthorized: Invalid or expired access token');
            // Here, you could try refreshing the token, or prompt the user to log in again
          } else {
            console.error('Server error:', error.response.status);
          }
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Request error:', error.message);
        }
      });
  }


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-10'>
      <h2 className='font-bold text-3xl'>Tell Us Your Travel Preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just Provide Us Some Basic Information and Our Trip Planner Will Generate a Customized Itinery Based On Your Prefereneces. </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Destination Choice ?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}

            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v) }
            }}
          />
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip ?</h2>
          <Input placeholder={'Maximum of 15 Days'} type='number'
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget ?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index} className={`p-4 border rounded-lg hover:shadow cursor-pointer
              ${formData?.budget == item.title && 'shadow-lg border-black'}
              `}
              onClick={() => handleInputChange('budget', item.title)}
            >
              <h2 className='text-3xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Who do You Plan on Traveling with on Your Next Adventure ?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelsList.map((item, index) => (
            <div key={index} className={`p-4 border rounded-lg hover:shadow cursor-pointer
            ${formData?.people == item.people && 'shadow-lg border-black'}`}
              onClick={() => handleInputChange('people', item.people)}
            >
              <h2 className='text-3xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>


      <div className='my-10 flex justify-end'>
        <Button onClick={onGenerateTrip}
          disabled={loading}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}</Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
              <p>Sign in into your app with Google authentication security</p>

              <Button
                onClick={login}
                className='w-full mt-5 flex gap-4 items-center'>

                <FcGoogle className='h-7 w-7' />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>



    </div>
  )
}

export default CreateTrip
