
"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import PujaModal from './PujaModal';
import Loader from './Loader';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [openPujaModal, setOpenPujaModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    const isAdminRoute = pathname?.startsWith('/admin');
    const isDashboardRoute = pathname?.startsWith('/client/dashboard');
    const isAgentRoute = pathname?.startsWith('/agent');
    const isLoginRoute = pathname?.startsWith('/client/login');
    const isCheckoutRoute = pathname?.startsWith('/checkout');

    // For these routes, we don't want the global Header/Footer/Loader
    if (isAdminRoute || isDashboardRoute || isAgentRoute || isLoginRoute || isCheckoutRoute) {
        return <div className="app">{children}</div>;
    }

    return (
        <div className="app">
            <Loader onLoaded={() => setLoading(false)} />

            {/* Content fades in or just appears after loader */}
            <div className={`transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                <Header onOpenPuja={() => setOpenPujaModal(true)} />

                <main>
                    {children}
                </main>

                <Footer onOpenPuja={() => setOpenPujaModal(true)} />
            </div>

            {/* GLOBAL MODAL */}
            <PujaModal
                isOpen={openPujaModal}
                onClose={() => setOpenPujaModal(false)}
            />
        </div>
    );
};

export default MainLayout;
