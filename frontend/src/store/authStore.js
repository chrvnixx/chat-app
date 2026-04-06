import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import axios from "axios"

const api_url = "http://localhost:4000/api"

export const useAuthStore = create((set) => ({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:true,
    isCheckingAuth:true,

    checkAuth: async()=>{
        try {
            const res = await axios.get(`${api_url}/auth/check-auth`)
            set({authUser:res.data})
        } catch (error) {
            console.log("Error in checkauth", error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    }
}));
