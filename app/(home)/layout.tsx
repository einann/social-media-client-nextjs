import { GetServerSidePropsContext } from "next";
import Navbar from "../components/Navbar";

type LayoutProps = {
    children?: React.ReactNode,
    modal: React.ReactNode
};

export default function HomeLayout({ children, modal }: LayoutProps) {
    return (
        <main className="w-full flex flex-col">
            <div className="w-full md:w-1/2 border self-center bg-white">
                <Navbar />
                <div className="flex flex-col md:flex-row">
                    {children}
                    {modal}
                </div>
            </div>
        </main>
    )
}