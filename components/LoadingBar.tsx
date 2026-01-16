'use client';

export default function LoadingBar() {
    return (
        <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
            {/* Animated Line Container */}
            <div className="relative w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
                {/* Sliding gradient line with glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent rounded-full animate-loading-slide">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent blur-sm opacity-50"></div>
                </div>
                {/* Pulse effect */}
                <div className="absolute inset-0 bg-black rounded-full animate-pulse opacity-20"></div>
            </div>
        </div>
    );
}
