import React from 'react'
import HeaderPage from './HeaderPage'
import FooterPage from './FooterPage'
import logo from '@/assets/brand-guide/logo.png';
import { Divider, Grid } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Col } from '@/lib/AntRegistry'

const CheckLayout = ({ children }: any) => {
    const screens = Grid.useBreakpoint()
    return (
        <>
            <header>
                <nav className="navbar py-3 px-5 navbar-expand-lg ">
                    <div className="container-fluid">
                        {!screens.md ?  <Link className="navbar-brand p-0" href="/">
                        <img src={logo.src} alt="error" height={50} width={50} />
                    </Link> :<Link className="navbar-brand p-0" href="/">
                            <h1 className='logo-text'>Copper & Crumb</h1>
                        </Link>}
                        <Link className="nav-item" href="/viewcart" legacyBehavior>
                                    <a className="nav-link" ><ShoppingCartOutlined /></a>
                                </Link>
                    </div>
                </nav>
            </header>
            <Divider className='m-0 p-0'/>
            <main className="main">{children}</main>
            {/* <footer>
                    <div className="">
                        <ul className="list-unstyled m-0 p-0 gap-4 d-flex">
                            <li> <div className="line"></div> <Link href={'/pages/privacy-policy'}>Privacy policy</Link></li>
                            <li><div className="line"></div><Link href={'/pages/return-policy'}>Return policy</Link></li>
                            <li><div className="line"></div><Link href={'/pages/terms-and-conditions'}>Terms & Conditions</Link></li>
                            <li><div className="line"></div><Link href={'/pages/contact-us'}>Contact Us</Link></li>
                        </ul>
                    </div>
            </footer> */}
        </>
    )
}

export default CheckLayout