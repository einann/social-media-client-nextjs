import { BiSolidSend } from "react-icons/bi";

export default function ShareSomething() {
    return (
        <form className="flex flex-col border-b p-2 mb-4 border-b-slate-100 bg-slate-100 rounded-md">
            <textarea className="resize-none border border-cyan-500/25 p-1 h-24 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50 rounded-md" placeholder='Share something...'></textarea>
            <button className="flex flex-row items-center justify-evenly self-end mt-2 bg-cyan-600 shadow-lg shadow-cyan-600/50 rounded-md p-1 text-white w-1/4 md:w-1/6 hover:bg-cyan-700 transition">
                Share
                <BiSolidSend />
            </button>
        </form>
    )
}
