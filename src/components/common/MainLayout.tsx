import {
  Avatar,
  Badge,
  Col,
  Divider,
  Empty,
  Row,
  Space,
  Button,
  Content,
  Dropdown,
  Flex,
  Footer,
  Header,
  Layout,
  Menu,
  Sider,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import { Grid, theme } from "antd";
import { useContext, useState, useEffect } from "react";
import profile from "@/assets/images/profile.png";
import MenuBar from "./MenuBar";
import CrumbIcons from "../CrumbIcons";
import Link from "next/link";
import type { MenuProps } from "antd";
import { useRouter } from "next/router";
import { GlobalContext } from "@/context/Provider";
import crumbApi from "@/utils/crumbApis";
const MainLayout = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { userType, logout, userInfo } = useContext(GlobalContext);
  const { user_type } = router.query;
  const {
    token: { colorText, borderRadiusLG },
  } = theme.useToken();
  const screens = Grid.useBreakpoint();
  console.log(userInfo, "userInfouserInfo");

  const [state, setState] = useState({
    data: [],
    count: 0,
  });






  const items: MenuProps["items"] = [
    {
      key: "2",
      label: (
        <Link href={`/profile`} className="fw-medium">
          Profile
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Link href={`/address`} className="fw-medium">
          Address
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Button
          type="text"
          onClick={() => logout()}
          size="small"
          className="p-0 fw-medium bg-transparent rounded-0 h-100"
        >
          Log Out
        </Button>
      ),
    },
  ];
  const itemsNotification: MenuProps['items'] = [
    {
      key: '1',
      label: <div>

        <Row>
          <Col span={24}>
            <Flex justify="space-between" align="center" className="mt-2"><TypographyTitle level={5} className='fw-bold m-0'>Activities</TypographyTitle>
              {state?.data?.length > 0 && <Link href={`/${userType}/alerts-activity/page/activity/1`} className="text-primary">See All</Link>}</Flex>
            <Divider plain className="my-3"></Divider>
          </Col>
        </Row>

        {
          ((state.data?.length > 0) && (state?.data?.length > 0)) ?
            <div>
              {/* Unread notifications  */}
              <Row>
                <Col span={24}>
                  <Space direction={screens.sm ? 'horizontal' : 'vertical'} className='notification-heading justify-content-between w-100 mb-3 text-center text-sm-start'>
                    <TypographyTitle level={5} className='fw-bold m-0'>Unread Notifications</TypographyTitle>
                    {state?.data?.length > 0 &&
                      <Button type='link' htmlType='button' className='text-green p-0 text-end'>Mark as all read</Button>}
                  </Space>
                </Col>

                <Row gutter={[15, 10]} className='pb-2 w-100'>
                  <Col span={24} className="notification-div">
                    <Flex vertical className="">
                      <ul className="list-unstyled mb-4 mh-25">
                        {
                          state?.data?.length > 0 ?
                            Array.isArray(state?.data) && state?.data?.slice(0, 5)?.map((res: any, index: number) => {
                              return <div key={res?._id} className="p-2">
                                <Link
                                  href={
                                    res?.notification_type === "DEPARTMENT"
                                      ? `/${userType}/department/page/1?limit=12&read_all=true`
                                      : res?.notification_type === "PROCESS" ? res?.process_id ? `/${userType}/process/${res?.process_id}/details?read_all=true` : `/${userType}/teammates/page/all/1` : `/${userType}`
                                  }
                                >
                                </Link>
                              </div>
                            })
                            : <li className="text-center">Nothing new for you.</li>
                        }
                      </ul>
                    </Flex>
                  </Col>
                </Row >
              </Row>

              {/* Divider  */}
              {/* <Row>
                <Col span={24}>
                  <Divider plain></Divider>
                </Col>
              </Row > */}

              {/* Previous notifications  */}
              {/* <Row className='mb-4' >
                <Col span={24}>
                  <div className='mb-3'>
                    <TypographyTitle level={5} className='fw-bold m-0'>Previous Notifications</TypographyTitle>
                  </div>
                </Col>

                <Row gutter={[15, 10]} className='w-100'>
                  <Col span={24}>
                    <Flex vertical>
                      <ul className="list-unstyled mb-4">
                        {
                          state?.data?.length !== 0 ?
                            Array.isArray(state?.data) && state?.data.map((res: any, index: number) => {
                              return <ActivityCard key={res?._id} {...res} type="read" />
                            })
                            : <li className="text-center">Nothing new for you.</li>
                        }
                      </ul>
                    </Flex>
                  </Col>
                </Row>
              </Row> */}
            </div> :
            <Empty description="Nothing new for you" />
        }

      </div >,
    },
  ]
  return (
    <>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={
            collapsed
              ? { borderRadius: 16, minWidth: 260, maxWidth: 260, width: 260 }
              : {
                borderRadius: 16,
                marginRight: 20,
                minWidth: 260,
                maxWidth: 260,
                width: 260,
              }
          }
        >
          {/* <div className={`demo-logo-vertical my-4 ${collapsed ? 'px-1' : 'px-3'}`} >
                        <CrumbIcons.LogoBlack />
                    </div> */}
          {/* {collapsed ? <div className="profile_details mx-0 px-2 mb-4 d-flex align-items-center gap-2" >
                        <Avatar src={profile.src} size={40} style={{ minWidth: 40 }} className="m-auto" />
                    </div> : */}
          <div className="profile_details mb-4 d-flex align-items-center gap-2">
            <Avatar
              src={
                userInfo?.profile_pic
                  ? crumbApi.FILES.imageSmall(userInfo?.profile_pic)
                  : profile.src
              }
              size={40}
              style={{ minWidth: 40 }}
            />
            <div>
              <TypographyText ellipsis className="fs-14 fw-semibold d-block text-capitalize">
                {userInfo?.name ? userInfo?.name?.length > 19 ? userInfo?.name?.slice(0, 19) + ".." : userInfo?.name : userInfo?.first_name ? userInfo.first_name?.length > 10 ? userInfo?.first_name?.slice(0, 10) + ".." :
                  `${userInfo?.first_name}` : "N/A"}
              </TypographyText>
            </div>
          </div>
          {/* <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <CrumbIcons.Dashboard />,
                label: (
                  <Link
                    className={`text-decoration-none ms-2 ps-1 ${collapsed && "opacity-0"
                      }`}
                    href={`/${userType}`}
                  >
                    Dashboard
                  </Link>
                ),
              },
              {
                key: "2",
                icon: <CrumbIcons.Process />,
                label: (
                  <Link
                    className={`text-decoration-none ms-2 ps-1 ${collapsed && "opacity-0"
                      }`}
                    href={`/${userType}/process/list/all/1`}
                  >
                    Processes
                  </Link>
                ),
              },
              {
                key: "3",
                icon: <CrumbIcons.Organizational />,
                label: (
                  <Link
                    className={`text-decoration-none ms-2 ps-1 ${collapsed && "opacity-0"
                      }`}
                    href={`/${userType}/organization-chart/all`}
                  >
                    Organizational Chart
                  </Link>
                ),
              },
              {
                key: "4",
                icon: <CrumbIcons.AlertActivity />,
                label: (
                  <Link
                    className={`text-decoration-none ms-2 ps-1 ${collapsed && "opacity-0"
                      }`}
                    href={`/${userType}/alerts-activity/page/alert/1`}
                  >
                    Alerts & Activity
                  </Link>
                ),
              },
              // {
              //   key: "5",
              //   icon: <CrumbIcons.AlertActivity />,
              //   label: (
              //     <Link
              //       className={`text-decoration-none ms-2 ps-1 ${collapsed && "opacity-0"
              //         }`}
              //       href={`/${userType}/alerts-activity/page/activity/1`}
              //     >
              //       Activity
              //     </Link>
              //   ),
              // },
            ]}
          /> */}
          <MenuBar />
        </Sider>
        <main
          style={
            screens.sm
              ? { width: "100%", paddingRight: 24, overflow: "auto" }
              : { width: "100%", paddingLeft: 0, overflow: "auto" }
          }
          className="d-flex flex-column"
        >
          <Header
            style={screens.sm ? { borderRadius: 16 } : { borderRadius: 0 }}
          >
            <Flex justify="space-between" align="center" gap={12}>
              <Button
                type="primary"
                className="rounded-2 d-flex align-items-center justify-content-center"
                icon={<CrumbIcons.Menu />}
                onClick={() => setCollapsed(!collapsed)}
              />
              <Flex align="center" gap={16}>
                {/* <Link href={`/${userType}/alerts-activity/page/alert/1`}>
                  <Button
                    type="text"
                    className="h-100 bg-transparent p-0"
                    shape="circle"
                  >
                    <CrumbIcons.Notification />
                  </Button>
                </Link> */}
                <Dropdown menu={{ items: itemsNotification }} prefixCls="notification-dropdown" trigger={['hover']} placement="bottomLeft" arrow>
                  <Badge color="#23C879" count={Number(state.count)} size='small' offset={[-5, 5]}>
                    <Button
                      type="text"
                      className="h-100 bg-transparent p-0"
                      shape="circle"
                    >
                      <CrumbIcons.Notification />
                    </Button>
                  </Badge>
                </Dropdown>
                <Dropdown menu={{ items }} placement="bottomLeft">
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
                  </Button>
                </Dropdown>
              </Flex>
            </Flex>
          </Header>
          <Content
            style={{
              marginTop: "24px",
              background: "transparent",
              minHeight: "unset",
            }}
          >
            {props.children}
          </Content>
          <Footer
            style={
              screens.sm
                ? {
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: "24px 40px",
                  marginTop: 30,
                }
                : {
                  background: "#ffffff",
                  borderRadius: 0,
                  padding: "24px 40px",
                  marginTop: 30,
                }
            }
          >
            <TypographyText className="fw-medium">
              Copyright &copy; 2024. All Rights Reserved.
            </TypographyText>
          </Footer>
        </main>
      </Layout>
    </>
  );
};

export default MainLayout;
