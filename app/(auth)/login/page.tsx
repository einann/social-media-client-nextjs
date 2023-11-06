export default function Login() {
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col p-12 md:w-1/5 border-2 rounded-lg border-cyan-800/10 shadow-lg shadow-cyan-600/25">
                <h2 className="text-center">Login</h2>
                <form className="flex flex-col">
                    <label className="flex flex-col p-3">
                        <span>Username</span>
                        <input
                            required
                            className="border-2 border-cyan-500/25 rounded-lg p-1"
                        />
                    </label>
                    <label className="flex flex-col p-3">
                        <span>Password</span>
                        <input
                            type="password"
                            required
                            className="border-2 border-cyan-500/25 rounded-lg p-1"
                        />
                    </label>
                    <button className="bg-cyan-600 shadow-lg shadow-cyan-600/50 rounded-lg p-1 text-white w-1/2 self-center hover:bg-cyan-700 transition">Login</button>
                </form>
            </div>
        </main>
    )
}
