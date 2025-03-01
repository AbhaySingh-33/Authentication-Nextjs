import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";

connect();


export async function POST(request:NextRequest){

    try {
        const reqBody = await request.json();
        const {email} = reqBody;

        console.log(reqBody);

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({ msg: "User not found" }, { status: 400 })
        }
        
        console.log("Email Found for changing Password")

        await sendEmail({ email, emailType: "RESET", userId: user._id });
        console.log("Email Sent for changing Password")

        return NextResponse.json({
            msg: "Email Sent successfully",
            success: true,
        
        });

    }

    catch(error:any){
        return (NextResponse.json(error),
        {status:500})
    }


}