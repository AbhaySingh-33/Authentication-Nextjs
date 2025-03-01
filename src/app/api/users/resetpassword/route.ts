import {connect} from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest){

    try {

        const reqBody = await request.json();
        const {token,NewPassword} = reqBody;

        const user= await User.findOne({forgotPasswordToken: token,
            forgotPasswordExpire: {$gt: Date.now()}})

       if(!user){
           return NextResponse.json({error: "Invalid or expired token"},{status:400})
       }
       console.log(user);
        console.log("user found for changing password")
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(NewPassword, salt);

        user.password=hashedPassword;
        user.forgotPasswordToken= undefined;
        user.forgotPasswordExpire= undefined;
        await user.save();
        console.log("success save")
        console.log("New Password is Updated")
        
        return NextResponse.json({
            msg: "Email Sent successfully",
            success: true,
        
        });

    } catch (error:any) {
        console.error("Error updating password:", error);
        return NextResponse.json({error: error.message},{status:500})       
    }


}