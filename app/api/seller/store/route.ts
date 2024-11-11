import prismaClient from "@/lib/prisma"
import { NextResponse } from "next/server"

interface newShop {
    name: string
    address: string
}
export default async function POST(req: Request) {
    const { name, address }: newShop = await req.json()

    const sellerId = 1//TODO: user id verify 

    if (!sellerId) {
        return NextResponse.json({ message: "Need to log in first" }, { status: 401 })
    }

    if (!name || !address) {
        return NextResponse.json({ message: "Store name and address are required" }, { status: 400 })
    }

    try {
        const seller = await prismaClient.seller.findFirst({
            where: {
                id: sellerId
            }
        })

        if (!seller) {
            return NextResponse.json({ message: "Invalid seller ID" }, { status: 404 })
        }

        const store = await prismaClient.store.findFirst({
            where: {
                sellerId: sellerId,
                Name: name,
                Address: address,
            }
        })

        if (store) {
            return NextResponse.json({ message: "Store already exists" }, { status: 400 })
        }

        const storeLink = name + '.' + sellerId + '.com'
        console.log(storeLink)
        const newStore = await prismaClient.store.create({
            data: {
                Name: name,
                Address: address,
                sellerId: sellerId,
                Link: storeLink
            }
        })

        return NextResponse.json({ message: "Store successfully created", storeId: newStore.id, storeLink }, { status: 201 })
    }
    catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
