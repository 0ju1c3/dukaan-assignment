import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import prismaClient from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req: Request) {

    if (!JWT_SECRET) {
        return NextResponse.json({ message: "Jwt secret is required" }, { status: 400 })
    }

    const { mobileNumber } = await req.json()

    if (!mobileNumber) {
        return NextResponse.json({ message: "Mobile Number is required" }, { status: 400 })
    }

    try {
        const seller = await prismaClient.seller.findFirst({
            where: {
                mobileNumber: mobileNumber
            }
        })

        if (seller) {
            return NextResponse.json({ message: "Seller already exists" }, { status: 400 })
        }

        const otp: number = Math.floor(Math.random() * 10000)
        const newSeller = await prismaClient.seller.create({
            data: {
                mobileNumber: mobileNumber,
                otp: otp
            }
        })

        const token = jwt.sign({ sellerID: newSeller.id }, JWT_SECRET, { expiresIn: '1h' })
        return NextResponse.json({ token }, { status: 201 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
