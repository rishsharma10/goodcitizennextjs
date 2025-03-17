import React, { useContext, useState } from 'react'
import logo from '@/assets/brand-guide/logo.png';
import { Button, Drawer, Dropdown, Flex } from '@/lib/AntRegistry';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { GlobalContext } from '@/context/Provider';
import { Avatar, Badge, Grid, MenuProps } from 'antd';
import profile from "@/assets/images/profile.png";
import crumbApi from '@/utils/crumbApis';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const HeaderSmall = () => {
    const screens = Grid.useBreakpoint()
    const { userInfo, logout, cartData,collapsed,setCollapsed } = useContext(GlobalContext)
    const items: MenuProps["items"] = [
        {
            key: "2",
            label: (
                <Button
                    type="text"
                    onClick={() => router.push(`https://copper-crumb.wloper.com/customer/dashboard`)}
                    size="small"
                    className="p-0 fs-18 fw-small bg-transparent rounded-0 h-100"
                >
                    PROFILE
                </Button>
            ),
        },
        { type: "divider" },
        // {
        //   key: "1",
        //   label: (
        //     <Link href={`/address`} className="fw-medium">
        //       Address
        //     </Link>
        //   ),
        // },
        {
            key: "3",
            label: (
                <Button
                    type="text"
                    onClick={() => logout()}
                    size="small"
                    className="p-0 fs-18 fw-small bg-transparent rounded-0 h-100"
                >
                    Log Out
                </Button>
            ),
        },
    ];
    const router = useRouter()
   
    return (
        <nav className="navbar py-3 navbar-expand-lg ">
            <div className="container-fluid">
                <Flex gap={4} align='center'>


                    <Link className="navbar-brand p-0 text-uppercase fw-bold" href="/">
                        Good Citizen
                    </Link>
                </Flex>
                <Flex gap={20} align='center'>

                    {/* <Link className="nav-item" href="/search" legacyBehavior>
                        <a className="nav-link " href="/search"><SearchOutlined /></a>
                    </Link>
                    <Badge count={cartData.count} showZero={false}>
                        <Link className="nav-item" href="/viewcart" legacyBehavior>
                            <a className="nav-link" ><ShoppingCartOutlined /></a>
                        </Link>
                    </Badge> */}






                    
                    {!userInfo?.access_token ? "" : <Dropdown menu={{ items }} placement="bottomLeft">
                        <Button type="text" className="h-100 p-0" shape="circle">
                            <Avatar
                                src={
                                    userInfo?.profile_pic
                                        ? crumbApi.FILES.imageSmall(
                                            userInfo?.profile_pic
                                        )
                                        : profile.src
                                }
                                size={30}
                            />
                        </Button>
                    </Dropdown>}
                    <div onClick={() => setCollapsed(!collapsed)}>
                        <button className="navbar-toggler bg-light p-0 border-0 shadow-none fs-6" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </Flex>
                {/* <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <Drawer open={collapsed} onClose={() => setCollapsed(!collapsed)} placement='left' width={250} closable={false}>
                    <Flex className='h-100 flex-column ' justify='start' align='start'>
                        <div className='d-flex flex-column gap-3'>
                            <Link className="nav-item" href="/" legacyBehavior>
                                Home
                            </Link>
                            
                            {!userInfo?.access_token ? <Link href={`/login`}><Button size='small' className='text-white' type='primary'>SIGN IN</Button></Link> : ""}
                        </div>
                        {userInfo?.access_token ?<Button onClick={() => logout()} type='text' className='p-0 text-capitalize text-danger mt-auto h-auto'>Logout</Button>:""}
                    </Flex>
                </Drawer>
                {/* {!userInfo?.access_token ? <Link href={`/login`}><Button className='text-white' type='primary'>SIGN IN</Button></Link> :  <Dropdown menu={{ items }} placement="bottomLeft">
                  <Button type="text" className="h-100 p-0" shape="circle">
                    <Avatar
                      src={
                        userInfo?.profile_pic
                          ? crumbApi.FILES.imageSmall(
                            userInfo?.profile_pic
                          )
                          : profile.src
                      }
                      size={40}
                    />
                    {userInfo?.first_name}
                  </Button>
                </Dropdown> } */}
            </div>
        </nav>
    )
}

export default HeaderSmall