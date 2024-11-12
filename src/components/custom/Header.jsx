import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IoLogOutOutline } from "react-icons/io5";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate, useNavigation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";

import axios from 'axios';
import { useAuth } from './authContext';



const Header = () => {
  const { user, token, login, logout } = useAuth();
  const user1 = JSON.parse(localStorage.getItem('user'))
  // const navigate = useNavigate()
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    console.log(user1)
  }, [])

  const UserLogin = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

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
        login(resp.data, tokenInfo.access_token)
        setOpenDialog(false);
        window.location.reload()
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
    <div className='p-3 shadow-sm flex justify-between items-center px-5 w-full'>
      <img src="/logo.svg" alt="" />
      <div className='inline-block'>
        {user1 ?
          <div className='flex items-center gap-3'>
            <a href="/create-trip" >
            <Button variant='outline' className='rounded-full'> + Add Trip</Button>
            </a>
            <a href="/my-trips" >
            <Button variant='outline' className='rounded-full'>My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger className='rounded-full p-0 '>
                <img src={user1?.picture} alt="" className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 onClick={() => {
                  googleLogout()
                  logout()
                  localStorage.clear()
                  window.location.reload()
                }} className='flex items-center gap-3 font-bold cursor-pointer'>Logout <IoLogOutOutline className='text-lg' />
                </h2>
              </PopoverContent>
            </Popover>

          </div> :

          <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>
        }
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
              <p>Sign in into your app with Google authentication security</p>

              <Button
                onClick={UserLogin}
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

export default Header

