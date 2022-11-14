import { useEffect, useState } from 'react';

export const useComponentSize = (containerRef: React.RefObject<any>) => {
    const [dimensions, setDimensions] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }
        const handleResize = () => {
            setDimensions({
                x: containerRef.current.offsetWidth,
                y: containerRef.current.offsetHeight,
            });
        };

        if (containerRef.current) {
            handleResize();
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [containerRef.current]);

    return dimensions;
};
