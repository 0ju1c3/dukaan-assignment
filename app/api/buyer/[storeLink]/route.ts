import prismaClient from "@/lib/prisma"
import { NextResponse } from "next/server"


export default async function get(req: Request) {
    const storeLink = "10"//TODO:get storeLink from url params

    if (!storeLink) {
        return NextResponse.json({ message: "Store link is required" }, { status: 400 })
    }

    try {
        const store = await prismaClient.store.findFirst({
            where: {
                Link: storeLink
            }
        })

        if (!store) {
            return NextResponse.json({ message: "Invalid store link" }, { status: 404 })
        }

        return NextResponse.json({ id: store.id, name: store.Name, address: store.Address })
    }
    catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
