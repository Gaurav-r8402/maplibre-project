import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { error } from "console";

export async function POST(req:Request) {
    try {
        const {email, password}=await req.json();

        if(!email || !password) {
            return NextResponse.json({ error: "Missing fields"},{status:400});
        }

        const hashed=await bcrypt.hash(password,10);

        await prisma.user.update({
            where: { email },
            data: {password: hashed},
        });

        return NextResponse.json({
            message:" Password updated Successfully"
        });
    }catch(error) {
        return NextResponse.json(
            {error: "Failed to reset password"},
            {status:500}
        )
    }
}