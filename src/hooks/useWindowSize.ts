import { useEffect, useState } from 'react';

export const useWindowSize = () => {
    const [size, setSize] = useState({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
    });

    const handleResize = () => {
        setSize({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [size]);

    return size;
};
