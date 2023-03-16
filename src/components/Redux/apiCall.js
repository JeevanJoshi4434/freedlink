import axios from "axios";
import {loginStart, loginSuccess, loginFailure, logout} from "./userReducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const login = async(dispatch, user,navigate)=>{
    dispatch(loginStart());
    try {
        const res = await axios.post(`/api/login`, user);
        dispatch(loginSuccess(res.data,toast.success('Login Successfully!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            }),navigate('/')));
    } catch (error) {
        dispatch(loginFailure(toast.error('Wrong Credentials! check Email & Password', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "light",
            })));
    }
}
export const VerifyEmail = async(dispatch, user,navigate)=>{
    dispatch(loginStart());
    try {
        const res = await axios.post(`/api/verify/email`, user);
        dispatch(loginSuccess(res.data,toast.success('Signup Successfully! Welcome,', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            }),navigate('/')));
    } catch (error) {
        dispatch(loginFailure(toast.error('Wrong OTP!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })));
    }
}

export const logoutUser = async(dispatch)=>{
    dispatch(logout());
}

export const signup = async(dispatch, user,navigate)=>{
    dispatch(loginStart());
    try {
        const res = await axios.post(`/api/signup/User`, user);
        dispatch(loginSuccess(res.data,navigate('/signup/email/verify'),toast.success('Signup Successfully! Check email to confirm your ID!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })));
    } catch (error) {
        dispatch(loginFailure(toast.error('Network Error! try again', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "light",
            })));
    }
}
