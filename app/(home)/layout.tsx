type LayoutProps = { children?: React.ReactNode }

export default function HomeLayout({ children }: LayoutProps) {
    return (
        <>
            {children}
        </>
    )
}
