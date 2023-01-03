import { useEffect, useState } from 'react';

export const useWindowSize = () => {
    const [size, setSize] = useState({
        x: window.innerWidth,
        y: window.innerHeight,
    });

    const handleResize = () => {
        setSize({
            x: window.innerWidth,
            y: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [size]);

    return size;
};
