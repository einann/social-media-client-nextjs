import Link from "next/link";

export default function Login() {
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col p-10 md:w-1/3 w-full border-2 rounded-lg border-cyan-800/10 shadow-lg shadow-slate-600/25 bg-white">
                <h2 className="text-center text-3xl text-slate-500 mb-5 pb-2 border-b-2 border-b-slate-100">Login</h2>
                <form className="flex flex-col">
                    <label className="flex flex-col mb-2">
                        <span className="text-slate-600">Username</span>
                        <input
                            required
                            className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50"
                        />
                    </label>
                    <label className="flex flex-col mb-5">
                        <span className="text-slate-600">Password</span>
                        <input
                            type="password"
                            required
                            className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50"
                        />
                    </label>
                    <button className="bg-cyan-600 shadow-lg shadow-cyan-600/50 rounded-md p-1 text-white w-1/2 self-center hover:bg-cyan-700 transition">Login</button>
                    <div className="flex justify-between mt-5 text-sm border-t-2 border-t-slate-100 pt-2">
                        <p className="text-slate-500">Don't have an account?</p>
                        <Link href="/signup" className="text-sky-500 font-bold hover:text-sky-600">Sign up</Link>
                    </div>
                    <Link href="/forgotpassword" className="mt-1 text-sky-500 text-sm hover:text-sky-600">Forgot password?</Link>
                </form>
            </div>
        </main>
    )
}
