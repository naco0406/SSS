import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Loader2 className="h-16 w-16 animate-spin text-green-500" />
            <p className="mt-4 text-lg font-semibold text-gray-700">로딩 중...</p>
            <p className="mt-10 text-xs text-center text-gray-500">© 2024 Naco. All rights reserved.</p>
        </div>
    );
};