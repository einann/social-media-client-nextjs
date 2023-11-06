type LayoutProps = { children?: React.ReactNode }

export default function HomeLayout({ children }: LayoutProps) {
    return (
        <>
            <p>Home</p>
            {children}
        </>
    )
}
