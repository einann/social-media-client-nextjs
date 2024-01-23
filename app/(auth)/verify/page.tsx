import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { BiInfoCircle } from "react-icons/bi";
import CustomLogout from "../../components/CustomLogout";
import ResendEmail from "@/app/components/ResendEmail";

export default async function VerifyEmail({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    let error: string = "", sendEmail: boolean = false;
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");                                                                   // Users must be logged in to activate their account
    else if (session.user.verified === "true") redirect("/");                                          // If account is already verified then redirect to home page
    else {
        // Check user verified status in db, if it is true let them to login again.
        const res = await fetch(`http://localhost:3001/users/${session.user.username}`, {
            headers: {
                "Authorization": `Bearer ${session?.tokens.access_token}`,
                "Content-Type": "application/json"
            }
        });
        if (res.ok) {
            const response = await res.json();
            if (response.verified === "true") {
                redirect("/verified");
            }
        }

        const verifyToken = searchParams?.token;
        if (verifyToken) {
            const res = await fetch(`http://localhost:3001/token/${session.user.username}`, {
                headers: {
                    "Authorization": `Bearer ${session.tokens.access_token}`,
                    "Content-Type": "application/json"
                }
            });
            if (res && !res.ok) {
                error = 'En error occured while verifying the token, please try again later.';
            }
            const response = await res.json();
            if (response.verifyToken !== verifyToken) {
                error = 'An error occured.';
                sendEmail = true;
            }
            else if (new Date(response.expireDate) < new Date()) {
                error = 'Token has expired.';
                sendEmail = true;
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
                    error = "";
                    redirect("/verified");
                }
            }
        }
        else {
            error = 'Please click the link on your email.';
            sendEmail = true;
        }
    }

    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col p-10 md:w-1/3 w-full border-2 rounded-lg border-cyan-800/10 shadow-lg shadow-slate-600/25 bg-white">
                <div className="flex items-center gap-5">
                    <BiInfoCircle className="text-5xl text-sky-600" />
                    <span className="pointer-events-none">An e-mail was sent to your adress <span className="font-bold text-cyan-800">{session.user.email}</span>. Please click the link on your email to verify your account.</span>
                </div>
                {error && <div className="mt-2 text-pink-600 flex justify-center border-b pb-2">{error}</div>}
                <div className="flex justify-evenly">
                    {sendEmail && <ResendEmail />}
                    <CustomLogout text="Logout" />
                </div>
            </div>
        </main>
    )
}
