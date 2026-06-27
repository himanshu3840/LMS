import React, { useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'

function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("student")
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSignUp = async () => {
        setLoading(true)
        try {
            await axios.post(
                serverUrl + "/api/auth/signup",
                { name, email, password, role },
                { withCredentials: true }
            )

            toast.success("SignUp Successfully")
            navigate("/login")
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error?.response?.data?.message || "Signup failed")
        }
    }

    return (
        <div className='bg-[#dddbdb] w-screen h-screen flex items-center justify-center'>
            <form
                className='w-[90%] md:w-[800px] h-[600px] bg-white shadow-xl rounded-2xl flex'
                onSubmit={(e) => e.preventDefault()}
            >
                <div className='md:w-1/2 w-full h-full flex flex-col items-center justify-center gap-4 p-6'>

                    <div>
                        <h1 className='font-semibold text-black text-2xl'>
                            Let's get Started
                        </h1>
                        <h2 className='text-gray-500 text-lg'>
                            Create your account
                        </h2>
                    </div>

                    <div className='w-[80%] flex flex-col gap-1'>
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder='Your name'
                            className='border px-4 py-2 rounded-md'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='w-[80%] flex flex-col gap-1'>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder='Your email'
                            className='border px-4 py-2 rounded-md'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='w-[80%] flex flex-col gap-1 relative'>
                        <label>Password</label>
                        <input
                            type={show ? "text" : "password"}
                            placeholder='********'
                            className='border px-4 py-2 rounded-md'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {!show ? (
                            <MdOutlineRemoveRedEye
                                className='absolute right-4 bottom-3 cursor-pointer'
                                onClick={() => setShow(true)}
                            />
                        ) : (
                            <MdRemoveRedEye
                                className='absolute right-4 bottom-3 cursor-pointer'
                                onClick={() => setShow(false)}
                            />
                        )}
                    </div>

                    <div className='flex gap-4'>
                        <button
                            type='button'
                            className={`px-4 py-2 rounded-full border ${
                                role === "student" ? "border-black" : "border-gray-400"
                            }`}
                            onClick={() => setRole("student")}
                        >
                            Student
                        </button>

                        <button
                            type='button'
                            className={`px-4 py-2 rounded-full border ${
                                role === "educator" ? "border-black" : "border-gray-400"
                            }`}
                            onClick={() => setRole("educator")}
                        >
                            Educator
                        </button>
                    </div>

                    <button
                        type='button'
                        className='w-[80%] bg-black text-white py-2 rounded-md flex justify-center'
                        disabled={loading}
                        onClick={handleSignUp}
                    >
                        {loading ? <ClipLoader size={25} color="white" /> : "Sign Up"}
                    </button>

                    <div className='text-gray-500'>
                        Already have an account?{" "}
                        <span
                            className='text-black underline cursor-pointer'
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </span>
                    </div>
                </div>

                <div className='hidden md:flex w-1/2 h-full bg-black rounded-r-2xl items-center justify-center'>
                    <h1 className='text-white text-3xl font-semibold'>
                        VIRTUAL COURSES
                    </h1>
                </div>
            </form>
        </div>
    )
}

export default SignUp