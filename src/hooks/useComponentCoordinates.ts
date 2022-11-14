import { useEffect, useState } from 'react';

export const useComponentCoordinates = (containerRef: React.RefObject<any> | null) => {
    const [coordinates, setCoordinates] = useState({ left: 0, top: 0, width: 0, height: 0 });

    useEffect(() => {
        if (!containerRef?.current) {
            return;
        }
        const handleResize = () => {
            setCoordinates({
                left: containerRef.current.offsetLeft,
                top: containerRef.current.offsetTop,
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight,
            });
        };

        if (containerRef) {
            handleResize();
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [containerRef]);

    return coordinates;
};
