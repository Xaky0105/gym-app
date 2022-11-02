import { useEffect, useState } from 'react';

export const useComponentSize = (containerRef: React.RefObject<any>) => {
    const getDimensions = () => ({
        x: containerRef.current.offsetWidth,
        y: containerRef.current.offsetHeight,
    });

    const [dimensions, setDimensions] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleResize = () => {
            setDimensions(getDimensions());
        };

        if (containerRef.current) {
            handleResize();
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [containerRef]);

    return dimensions;
};
