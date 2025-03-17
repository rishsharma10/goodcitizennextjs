import dynamic from "next/dynamic";

const {
  Row,
  FormList,
  Steps,
  Menu,
  BadgeRibbon,
  SelectOption,
  Col,
  Tag,
  Empty,
  Card,
  AntForm,
  FormItem,
  Button,
  Select,
  Space,
  TextArea,
  Switch,
  Input,
  Pagination,
  Avatar,
  AvatarGroup,
  Radio,
  InputPassword,
  Checkbox,
  Table,
  List,
  FloatButtonGroup,
  ListItem,
  TypographyText,
  TypographyTitle,
  Rate,
  DatePicker,
  Upload,
  Divider,
  Dropdown,
  Modal,
  FloatButton,
  ConfigProvider,
  Tabs,
  Dragger,
  RadioGroup,
  Badge,
  Collapse,
  Descriptions,
  Breadcrumb,
  Tooltip,
  CheckboxGroup,
  Calendar,
  Image,
  Drawer,
  TimePicker,
  Spin,
  Slider,
  Skeleton,
  Sider,
  Popover,
  Flex,
  Search,
  Progress,
  Layout,
  Header,
  Footer,
  Content
} = {
  ConfigProvider: dynamic(
    () => import("antd").then((module) => module.ConfigProvider),
    {
      ssr: false,
    }
  ),
  Upload: dynamic(() => import("antd").then((module) => module.Upload), {
    ssr: false,
  }),
  Progress: dynamic(() => import("antd").then((module) => module.Progress), {
    ssr: false,
  }),
  Layout: dynamic(() => import("antd").then((module) => module.Layout), {
    ssr: false,
  }),
  Sider: dynamic(() => import("antd").then((module) => module.Layout.Sider), {
    ssr: false,
  }),
  Header: dynamic(() => import("antd").then((module) => module.Layout.Header), {
    ssr: false,
  }),
  Footer: dynamic(() => import("antd").then((module) => module.Layout.Footer), {
    ssr: false,
  }),
  Content: dynamic(() => import("antd").then((module) => module.Layout.Content), {
    ssr: false,
  }),
  Menu: dynamic(() => import("antd").then((module) => module.Menu), {
    ssr: false,
  }),
  Flex: dynamic(() => import("antd").then((module) => module.Flex), {
    ssr: false,
  }),
  Spin: dynamic(() => import("antd").then((module) => module.Spin), {
    ssr: false,
  }),
  Search: dynamic(() => import("antd").then((module) => module.Input.Search), {
    ssr: false,
  }),
  Drawer: dynamic(() => import("antd").then((module) => module.Drawer), {
    ssr: false,
  }),
  Collapse: dynamic(() => import("antd").then((module) => module.Collapse), {
    ssr: false,
  }),
  Rate: dynamic(() => import("antd").then((module) => module.Rate), {
    ssr: false,
  }),
  Popover: dynamic(() => import("antd").then((module) => module.Popover), {
    ssr: false,
  }),
  Empty: dynamic(() => import("antd").then((module) => module.Empty), {
    ssr: false,
  }),
  List: dynamic(() => import("antd").then((module) => module.List), {
    ssr: false,
  }),
  ListItem: dynamic(() => import("antd").then((module) => module.List.Item), {
    ssr: false,
  }),
  Slider: dynamic(() => import("antd").then((module) => module.Slider), {
    ssr: false,
  }),
  Dragger: dynamic(
    () => import("antd").then((module) => module.Upload.Dragger),
    {
      ssr: false,
    }
  ),
  Row: dynamic(() => import("antd").then((module) => module.Row), {
    ssr: false,
  }),
  Col: dynamic(() => import("antd").then((module) => module.Col), {
    ssr: false,
  }),
  AntForm: dynamic(() => import("antd").then((module) => module.Form), {
    ssr: false,
  }),
  FormItem: dynamic(() => import("antd").then((module) => module.Form.Item), {
    ssr: false,
  }),
  FormList: dynamic(() => import("antd").then((module) => module.Form.List), {
    ssr: false,
  }),
  Button: dynamic(() => import("antd").then((module) => module.Button), {
    ssr: false,
  }),
  Space: dynamic(() => import("antd").then((module) => module.Space), {
    ssr: false,
  }),
  Input: dynamic(() => import("antd").then((module) => module.Input), {
    ssr: false,
  }),
  TextArea: dynamic(
    () => import("antd").then((module) => module.Input.TextArea),
    {
      ssr: false,
    }
  ),

  InputPassword: dynamic(
    () => import("antd").then((module) => module.Input.Password),
    {
      ssr: false,
    }
  ),
  TypographyTitle: dynamic(
    () => import("antd").then((module) => module.Typography.Title),
    {
      ssr: false,
    }
  ),
  TypographyText: dynamic(
    () => import("antd").then((module) => module.Typography.Text),
    {
      ssr: false,
    }
  ),
  Select: dynamic(() => import("antd").then((module) => module.Select), {
    ssr: false,
  }),
  SelectOption: dynamic(() => import("antd").then((module) => module.Select.Option), {
    ssr: false,
  }),
  Switch: dynamic(() => import("antd").then((module) => module.Switch), {
    ssr: false,
  }),
  Image: dynamic(() => import("antd").then((module) => module.Image), {
    ssr: false,
  }),
  Dropdown: dynamic(() => import("antd").then((module) => module.Dropdown), {
    ssr: false,
  }),
  DatePicker: dynamic(
    () => import("antd").then((module) => module.DatePicker),
    {
      ssr: false,
    }
  ),
  Card: dynamic(() => import("antd").then((module) => module.Card), {
    ssr: false,
  }),
  Table: dynamic(() => import("antd").then((module) => module.Table), {
    ssr: false,
  }),
  Modal: dynamic(() => import("antd").then((module) => module.Modal), {
    ssr: false,
  }),
  Divider: dynamic(() => import("antd").then((module) => module.Divider), {
    ssr: false,
  }),
  Tabs: dynamic(() => import("antd").then((module) => module.Tabs), {
    ssr: false,
  }),
  Pagination: dynamic(
    () => import("antd").then((module) => module.Pagination),
    {
      ssr: false,
    }
  ),
  RadioGroup: dynamic(() => import("antd").then((module) => module.Radio.Group), {
    ssr: false,
  }),
  Radio: dynamic(() => import("antd").then((module) => module.Radio), {
    ssr: false,
  }),
  Checkbox: dynamic(() => import("antd").then((module) => module.Checkbox), {
    ssr: false,
  }),
  CheckboxGroup: dynamic(() => import("antd").then((module) => module.Checkbox.Group), {
    ssr: false,
  }),
  Avatar: dynamic(() => import("antd").then((module) => module.Avatar), {
    ssr: false,
  }),
  AvatarGroup: dynamic(
    () => import("antd").then((module) => module.Avatar.Group),
    {
      ssr: false,
    }
  ),
  Breadcrumb: dynamic(
    () => import("antd").then((module) => module.Breadcrumb),
    {
      ssr: false,
    }
  ),
  Descriptions: dynamic(
    () => import("antd").then((module) => module.Descriptions),
    {
      ssr: false,
    }
  ),
  Tag: dynamic(() => import("antd").then((module) => module.Tag), {
    ssr: false,
  }),
  Tooltip: dynamic(() => import("antd").then((module) => module.Tag), {
    ssr: false,
  }),
  Calendar: dynamic(() => import("antd").then((module) => module.Calendar), {
    ssr: false,
  }),
  TimePicker: dynamic(
    () => import("antd").then((module) => module.TimePicker),
    {
      ssr: false,
    }
  ),
  Skeleton: dynamic(() => import("antd").then((module) => module.Skeleton), {
    ssr: false,
  }),
  Badge: dynamic(() => import("antd").then((module) => module.Badge), {
    ssr: false,
  }),
  BadgeRibbon: dynamic(() => import("antd").then((module) => module.Badge.Ribbon), {
    ssr: false,
  }),
  FloatButton: dynamic(() => import("antd").then((module) => module.FloatButton), {
    ssr: false,
  }),
  FloatButtonGroup: dynamic(() => import("antd").then((module) => module.FloatButton.Group), {
    ssr: false,
  }),
  Steps: dynamic(() => import("antd").then((module) => module.Steps), {
    ssr: false,
  }),
};
export {
  Row,
  Radio,
  Col,
  SelectOption,
  FloatButton,
  Card,
  Avatar,
  Collapse,
  AntForm,
  FormItem,
  FloatButtonGroup,
  Checkbox,
  Badge,
  Rate,
  Button,
  Select,
  Space,
  ListItem,
  Switch,
  Input,
  List,
  InputPassword,
  Table,
  TypographyText,
  Pagination,
  TypographyTitle,
  Upload,
  DatePicker,
  Divider,
  Dropdown,
  Modal,
  Tabs,
  ConfigProvider,
  RadioGroup,
  TextArea,
  Spin,
  AvatarGroup,
  Calendar,
  Dragger,
  Empty,
  Descriptions,
  Breadcrumb,
  Tag,
  Tooltip,
  Image,
  TimePicker,
  CheckboxGroup,
  Slider,
  Popover,
  Skeleton,
  Drawer,
  BadgeRibbon,
  Search,
  Flex,
  Progress,
  Layout,
  Sider,
  Menu,
  Header,
  Footer,
  Content,
  FormList,
  Steps
};

