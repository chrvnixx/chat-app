import { create } from "zustand";
import axios from "axios"
import { axiosInstance } from '../lib/axios';
import toast from "react-hot-toast";

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
    },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post(`${api_url}/auth/signup`, data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post(`${api_url}/auth/login`, data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axios.post(`${api_url}/auth/logout`);
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axios.post(`${api_url}/auth/update-profile`, data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));

