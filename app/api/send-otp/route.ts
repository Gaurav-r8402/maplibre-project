import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";


export async function POST(req:Response) {
    try {
        const { email }=await req.json();

        const user=await prisma.user.findUnique({ where: { email}});
        if(!user) {
            return NextResponse.json({error: "user not found"}, { status: 404});
        }

        const otp=Math.floor(10000+ Math.random()*90000).toString();


        const expiresAt=new Date(Date.now()+5*60 *1000);

        await prisma.passwordOTP.create({
            data: { email, otp, expiresAt} 
        });

        await sendEmail(
            email,
            `Your Password Reset OTP`,
            `Your OTP is: ${otp}\n\nIt is valid for 5 minutes.`
        );

        // console.log("Your otp :", otp);

        return NextResponse.json({
            message: "OTP sent to email",
        });
    } catch(error: any) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong"}, { status: 500});
    }
}
