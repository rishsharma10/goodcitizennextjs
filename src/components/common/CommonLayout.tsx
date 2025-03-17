import React from 'react'
import HeaderPage from './HeaderPage'
import FooterPage from './FooterPage'
import { Grid } from 'antd'
import HeaderSmall from '../HeaderSmall'

const CommonLayout = ({ children }: any) => {
    const screens = Grid.useBreakpoint()
    return (
        <>
            <header>
                {!screens.md ? <HeaderSmall/>:<HeaderPage />}
            </header>
            <main className="main">{children}</main>
            <footer>
                {/* <FooterPage /> */}
            </footer>
        </>
    )
}

export default CommonLayout