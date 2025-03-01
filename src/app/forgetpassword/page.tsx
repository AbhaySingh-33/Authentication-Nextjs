"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";
import { sendEmail } from "@/helpers/mailer";

export default function forgetpassword(){

        const router = useRouter();

        const [ButtonDisabled, setButtonDisabled] = useState(false);
        const [loading, setloading] = useState(false)
        const [email, setemail] = useState("")


            const  handlesubmit = async(e:any)=>{
            e.preventDefault(); // Prevent default form submission
            console.log("Form submitted for changing password"); // Debugging statement

            try {
                setloading(true);
                console.log("Sending request to /api/users/forgetpassword"); // Debugging statement
                await axios.post("/api/users/forgetpassword", {email});
                
                toast.success("Email Sent");
                router.push("/login");
                setemail("")
            } catch (error) {
                console.log("Error logging in", error);
                toast.error("Error in process");
            } finally {
                setloading(false);
            }
        };


            useEffect(() => {
                    if (email === "") {
                        setButtonDisabled(true);
                    } else {
                        setButtonDisabled(false);
                    }
                }, [email]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-8">{loading ? "Processing" : "Forget Password"}</h1>
            <form className="w-full max-w-sm" onSubmit={handlesubmit}>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                </div>
                
                <button
                    className="mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    {ButtonDisabled ? "Enter Your Email" : "Sumbit"}
                </button>

            </form>
        </div>
    );


}