import prismaClient from "@/lib/prisma"
import { NextResponse } from "next/server"


export default async function POST(req: Request) {
    const { mobileNumber, address } = await req.json()

    if (!mobileNumber || address) {
        return NextResponse.json({ message: "Mobile Number is required" }, { status: 400 })
    }

    try {
        const checkBuyer = await prismaClient.buyer.findFirst({
            where: {
                mobileNumber: mobileNumber
            }
        })

        let id

        if (!checkBuyer) {
            const otp: number = Math.floor(Math.random() * 10000)
            const newBuyer = await prismaClient.buyer.create({
                data: {
                    mobileNumber: mobileNumber,
                    otp: otp,
                    address: address
                }
            })
            id = newBuyer.id
        }
        else {
            id = checkBuyer.id
        }
    }
    catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
