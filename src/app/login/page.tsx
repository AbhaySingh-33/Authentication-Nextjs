"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";
import { sendEmail } from "@/helpers/mailer";

export default function LoginPage() {

    const router = useRouter();
  
    const [ButtonDisabled, setButtonDisabled] = useState(false);
    const [loading, setloading] = useState(false)
    const [status, setstatus] = useState(false)

    const [user, setuser] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        setuser({
            email: "",
            password: ""
        });
    }, []);

    const OnLogin = async (e: any) => {
        e.preventDefault(); // Prevent default form submission
        console.log("Form submitted"); // Debugging statement

        try {
            setloading(true);
            console.log("Sending request to /api/users/login"); // Debugging statement
            const response = await axios.post("/api/users/login", user);
            console.log(response.data);
            console.log("Login Successfully", response.data);
            toast.success("Login Successfully");
            router.push("/profile");
            setuser({
                email: "",
                password: ""
            });
        } catch (error) {
            console.log("Error logging in", error);
            setstatus(true)
            toast.error("Error logging in");
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        if (user.email === "" || user.password === "") {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-8">{loading ? "Processing" : "Login"}</h1>
            <form className="w-full max-w-sm" onSubmit={OnLogin}>

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
                {status && (
                    
                    <div className="mt-2 mb-2 mx-3 flex ">
                        <p className="mx-2">can't Rember Password</p>
                        <Link className="text-cnter text-red-500 mx-5" href={'/forgetpassword'}>Forget Password</Link>
                    </div>

                    )
                }
                <button
                    className="mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    {ButtonDisabled ? "Please fill all the fields" : "Login"}
                </button>
                <br />
                <span className="mt-10 mx-2">Don't have an account?</span>
                <Link className="text-blue-500" href="/signup">Signup</Link>
            </form>
        </div>
    );
}