//customRouter.js
import { useRouter as useNextRouter } from 'next/navigation';

export const useRouter = () => {
    const router = useNextRouter();

    if (!router) {
        throw new Error('useRouter may only be used within a Next.js application');
    }

    return router;
};