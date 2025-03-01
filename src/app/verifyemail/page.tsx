"use client"

import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage(){

    const [token, settoken] = useState("");
    const [verified, setverified] = useState(false)
    const [error, seterror] = useState(false)

    const verifyUserEmail= async ()=>{
        try {
           await axios.post('/api/users/verifyemail',{token})
            setverified(true)
            toast.success("Email Verified")
            
        } catch (error:any) {
            seterror(true);
            toast.error("Not verified")
            
        }
    }

    useEffect(()=>{
        const urlToken= window.location.search.split("=")
        [1]
        settoken(urlToken || "");
        
    },[])

    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail();
        }
         
    },[token]);


return (
    <div className="flex flex-col items-center 
    justify-center min-h-screen py-2">

        <h1 className="text-4xl mb-3">Verify Email</h1>
        <h2 className="p-2 mb-5 bg-orange-500 text-black">{token? `${token}`:"no token"} </h2>

        {verified && (
            <div>
                <h2 className="text-2xl mb-5">
                  Email verified
                </h2>
                <Link className="text-center text-blue-500 mt-10 mx-12" href="/login">Login</Link>
            </div>
        )}

            {error && (
            <div>
                <h2 className="text-2xl bg-red-500">
                  Error
                </h2>
                
            </div>
        )}

    </div>
)

}