"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage(){
    const router = useRouter();
    const [data, setdata] = useState("nothing");

    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error) {
            toast.error("Failed to logout");
        }
    }   

    const getUserDetails = async () => {
        try {
            const response = await axios.get("/api/users/me");
            console.log(response.data);
            setdata(response.data.data.username);
        } catch (error) {
            toast.error("Failed to fetch user details");
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-1 rounded bg-pink-600 text-black mt-3 mb-3">
                {data === "nothing" ? "nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <button 
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={logout}
            >
                Logout
            </button>
            <button 
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={getUserDetails}
            >
                Get User Details
            </button>
        </div>
    )
}