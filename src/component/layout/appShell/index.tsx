import { useRouter } from "next/router";
import { Roboto } from 'next/font/google'

type AppShellProps = {
    children: React.ReactNode;
};

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

const disableNavbar = ["/auth/login", "/auth/register", "/404"];

const AppShell: React.FC<AppShellProps> = ({ children }) => {
    const { pathname } = useRouter();

    return (
        <main className={roboto.className}>
            {!disableNavbar.includes(pathname)}
            {children}
        </main>
    );
};

export default AppShell;
