import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BiInfoCircle } from "react-icons/bi";

export default async function VerifyEmail({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    let error: string = "";
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");
    else if (session.user.verified === "true") redirect("/");
    else {
        const verifyToken = searchParams?.token;
        if (verifyToken) {
            const res = await fetch(`http://localhost:3001/token/${session.user.username}`, {
                headers: {
                    "Authorization": `Bearer ${session.tokens.access_token}`,
                    "Content-Type": "application/json"
                }
            });
            if (res && !res.ok) {
                error = 'CLICK TO Set token again and resend the mail.';
            }
            const response = await res.json();
            if (response.verifyToken !== verifyToken) {
                error = 'CLICK TO Set token again and resend the mail.';
            }
            else if (new Date(response.expireDate) < new Date()) {
                error = 'CLICK TO Set token again and resend the mail.';
            }

            if (!error) {
                const res = await fetch('http://localhost:3001/users', {
                    method: 'PUT',
                    body: JSON.stringify({
                        username: session.user.username,
                        verified: 'true',
                    }),
                    headers: {
                        "Authorization": `Bearer ${session.tokens.access_token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (res.ok) {
                    console.log('X')
                    redirect("/verified");
                }
            }
        }
        else {
            error = 'CLICK TO Set token again and resend the mail.';
        }
    }

    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col p-10 md:w-1/3 w-full border-2 rounded-lg border-cyan-800/10 shadow-lg shadow-slate-600/25 bg-white">
                <div className="flex items-center gap-5">
                    <BiInfoCircle className="text-5xl text-sky-600" />
                    <span className="pointer-events-none">An e-mail was sent to your adress <span className="font-bold text-cyan-800">{session.user.email}</span>. Please click the link on your email to verify your account.</span>
                </div>
                <Link href="/api/auth/signout">Logout</Link>
            </div>
        </main>
    )
}
