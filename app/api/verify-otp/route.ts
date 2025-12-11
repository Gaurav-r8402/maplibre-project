import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, otp}=await req.json();

    const record=await prisma.passwordOTP.findFirst({
        where: {email, otp}
    });

    if(!record) {
        return NextResponse.json({error: "Invalid OTP"}, {status: 400})
    }

    if(record.expiresAt < new Date()) {
        return NextResponse.json({error: "OTP Expired"}, {status: 400});
    }

    return NextResponse.json({success: true, message: "OTP verified"});
}


// maplibre-project
// vwou whan lvbm rdog