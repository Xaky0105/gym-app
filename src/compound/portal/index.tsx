import { FC, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type PortalType = {
    children: ReactNode;
};

export const Portal: FC<PortalType> = ({ children }) => {
    const [container] = useState(() => document.createElement('div'));

    useEffect(() => {
        document.body.appendChild(container);
        return () => {
            document.body.removeChild(container);
        };
    }, []);
    return ReactDOM.createPortal(children, container);
};
