'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingBar from './LoadingBar';

export default function NavigationLoader({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Stop loading when route changes
        setLoading(false);
    }, [pathname, searchParams]);

    useEffect(() => {
        // Listen for link clicks
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (link && link.href && !link.target) {
                const url = new URL(link.href);
                // Only show loading for internal navigation
                if (url.origin === window.location.origin && url.pathname !== pathname) {
                    setLoading(true);
                }
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [pathname]);

    return (
        <>
            {loading && <LoadingBar />}
            {children}
        </>
    );
}
