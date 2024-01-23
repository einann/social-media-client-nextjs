import error from "@/app/(home)/error";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

type MethodTypes = "GET" | "POST" | "PUT" | "DELETE";

export async function globalFetch_server(apiRoute: string, method: MethodTypes, filter: any): Promise<any> {
    const session = await getServerSession(authOptions);
    const res = await fetch(`${process.env.BACKEND_URL}/${apiRoute}`, {
        method: method,
        body: JSON.stringify(filter),
        headers: {
            "Authorization": `Bearer ${session?.tokens.access_token}`,
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) {
        // return error();
    }
    return res.json();
}