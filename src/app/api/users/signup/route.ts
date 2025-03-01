import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password, username } = reqBody;

        console.log(reqBody);

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ msg: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            username
        });

        const savedUser = await newUser.save();

        console.log(savedUser);

        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            msg: "User created successfully",
            success: true,
            savedUser
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: "Error creating user", error }, { status: 500 });
    }
}
