import { Menu } from "@/lib/AntRegistry";
import { Fragment, useContext, useState } from "react"
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import Link from "next/link";
import CrumbIcons from "../CrumbIcons";
import { useRouter } from "next/router";
import { GlobalContext } from "@/context/Provider";
import { MenuProps } from "antd";
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
const MenuBar = () => {
    const router = useRouter()
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
    const {userType}=useContext(GlobalContext)
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        debugger
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
          setOpenKeys(keys);
        } else {
          setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
      };
      const items: MenuItem[] = [
        
          getItem(<Link href={`/${userType}`} className='text-decoration-none ms-2'>Dashboard</Link>, '', <CrumbIcons.Dashboard />),
          getItem(<Link href={`/${userType}/process/list/all/1`} className='text-decoration-none ms-2'>Process</Link>, 'process', <CrumbIcons.Process />),
          getItem(<Link href={`/${userType}/organization-chart/all`} className='text-decoration-none ms-2'>Organizational Chart</Link>, 'organization-chart', <CrumbIcons.Organizational />),
          getItem(<Link href={`/${userType}/alerts-activity/page/alert/1`} className='text-decoration-none ms-2'>Alerts & Activity</Link>, 'alerts-activity', <CrumbIcons.AlertActivity />),
       
      ];
    return (
        <Fragment>
            {/* <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <CrumbIcons.Dashboard />,
                        label: <Link className="text-decoration-none ms-2 ps-1" href={`/`}>Dashboard</Link>,
                    },
                    {
                        key: '2',
                        icon: <CrumbIcons.Process />,
                        label: <Link className="text-decoration-none ms-2 ps-1" href={`/process/list/all/1`}>Process</Link>,
                    },
                    {
                        key: '3',
                        icon: <CrumbIcons.Organizational />,
                        label: <Link className="text-decoration-none ms-2 ps-1" href={`/organization-chart/all`}>Organizational Chart</Link>,
                    },
                    {
                        key: '4',
                        icon: <CrumbIcons.AlertActivity />,
                        label: <Link className="text-decoration-none ms-2 ps-1" href={`/alerts-activity`}>Alerts & Activity</Link>,
                    },
                ]}
            /> */}
             <Menu
             theme="light"
             mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[router.pathname.split('/').length<=2?router.pathname.split('/')[1]:router.pathname.split('/')[2]]}
          items={items}
        />
        </Fragment>
    )
}
export default MenuBar;