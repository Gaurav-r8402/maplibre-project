import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    const { name, email, password} = await req.json();

    const exists= await prisma.user.findUnique({ where: { email }});
    if(exists) return Response.json({ error: "Email exists"}, { status: 400 });

    const hashed=await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: { name, email, password: hashed},
    });

    return Response.json({ message: " User Crreated "});
}