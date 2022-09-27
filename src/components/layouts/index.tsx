import React from 'react'
import Header from '../header'

type LayoutPropsType = {
    children: React.ReactNode
}

const Layout: React.FC<LayoutPropsType> = ({children}) => {
    return (
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment> 
    )
}

export default Layout