import { GetServerSidePropsContext } from "next";
import Navbar from "../components/Navbar";

type LayoutProps = {
    children?: React.ReactNode,
};

export default function HomeLayout({ children }: LayoutProps) {
    return (
        <main className="w-full flex flex-col">
            <div className="w-full md:w-1/2 border self-center bg-white">
                <Navbar />
                <div className="flex flex-col md:flex-row">
                    {children}
                </div>
            </div>
        </main>
    )
}