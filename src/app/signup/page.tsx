"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage() {

    const router = useRouter();

    const [ButtonDisabled, setButtonDisabled] = useState(false);
    const [loading, setloading] = useState(false)

    const [user, setuser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const onSignup = async (e: any) => {
        e.preventDefault(); // Prevent default form submission
        try {
            setloading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("SignUP Sucessfully", response.data);
            toast.success("SignUP Sucessfully");
            router.push("/login");
            setuser({
                email: "",
                password: "",
                username: ""
            });
        } catch (error) {
            toast.error("Error signing up");
        } finally {
            setloading(false);
        }
    }

    useEffect(() => {
        if (user.email === "" || user.password === "" || user.username === "") {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }), [user];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-8"> {loading?"Processing":"Sign Up"} </h1>
            <form className="w-full max-w-sm" onSubmit={onSignup} >

            <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="Username"
                        type="Username"
                        placeholder="Username"
                        value={user.username}
                        onChange={(e) => setuser({ ...user, username: e.target.value })}
                    />
                </div>


                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => setuser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) => setuser({ ...user, password: e.target.value })}
                    />
                </div>
                <button
                    className="mb-5 bg-blue-500 hover:bg-blue-700
                     text-white font-bold 
                    py-2 px-4 rounded focus:outline-none 
                    focus:shadow-outline "
                    type="submit"
                >
                   {ButtonDisabled ? "fil all the details`" : "Sign Up"}
                </button>
                <br />
                <span className="mt-10 mx-2">Already have an account?</span>
                <Link className="text-blue-500" href="/login">login</Link>
            </form>
        </div>
    );
}