import { useEffect, useState } from 'react';

export const useComponentCoordinates = (containerRef: React.RefObject<any> | null) => {
    const [coordinates, setCoordinates] = useState({ left: 0, top: 0, x: 0, y: 0 });
    useEffect(() => {
        const handleResize = () => {
            setCoordinates({
                left: containerRef?.current ? containerRef.current.offsetLeft : 0,
                top: containerRef?.current ? containerRef.current.offsetTop : 0,
                x: containerRef?.current ? containerRef.current.offsetWidth : 0,
                y: containerRef?.current ? containerRef.current.offsetHeight : 0,
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
