import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Footer from '@/components/footer';
import Header from '@/components/header';
import AuthProvider from './providers/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Bastet',
    description: 'Plataforma de cursos online',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='pt-br'>
            <body className={inter.className}>
                <AuthProvider>
                    <div className='flex min-h-screen flex-col gap-10'>
                        <Header />
                        <div className='layout-guide flex-1'>{children}</div>
                        <Footer />
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
