import { TfiHome } from "react-icons/tfi";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { RiNotification2Fill, RiSettings5Line } from "react-icons/ri";
import { BsFilePdfFill } from "react-icons/bs";
import { MdAdminPanelSettings, MdManageAccounts } from "react-icons/md";
import { CgUserList } from "react-icons/cg";
import { FcSalesPerformance } from "react-icons/fc";
import { TbActivity } from "react-icons/tb";
export const adminNav = [
  {
    id: 1,
    single: true,
    icon: <TfiHome size={18} />,
    name: "Dashboard",
    href: "/",
  },
  {
    id: 2,
    single: false,
    icon: <FiUsers size={18} />,
    name: "user-setting",
    navData: [
      {
        id: 1,
        name: "User List",
        icon: <FaUsers size={18} />,
        single: true,
        href: "/user-setting/user-list",
      },
      {
        id: 2,
        name: "Create User",
        icon: <FaUserPlus size={18} />,
        single: true,
        href: "/user-setting/create-user",
      },
    ],
  },
  {
    id: 3,
    single: false,
    icon: <MdManageAccounts size={18} />,
    name: "Roles & Permission",
    navData: [
      {
        id: 1,
        name: "Role List",
        single: true,
        icon: <CgUserList size={18} />,
        href: "/roles&permission/role-list",
      },
      {
        id: 2,
        name: "Permission List",
        single: true,
        icon: <MdAdminPanelSettings size={18} />,
        href: "/roles&permission/permission-list",
      },
    ],
  },
  {
    id: 4,
    single: false,
    icon: <BsFilePdfFill size={18} />,
    name: "Reports",
    navData: [
      {
        id: 1,
        name: "Performance Report",
        icon: <FcSalesPerformance size={18} />,
        single: true,
        href: "/report/performance-report",
      },
      {
        id: 2,
        name: "Activity Report",
        icon: <TbActivity size={18} />,
        single: true,
        href: "/report/activity-report",
      },
    ],
  },
  {
    id: 5,
    single: false,
    icon: <CiSettings size={18} />,
    name: "Setting",
    navData: [
      {
        id: 1,
        name: "General Setting",
        icon: <RiSettings5Line size={18} />,
        single: true,
        href: "/setting/general-setting",
      },
      {
        id: 2,
        name: "Notification Setting",
        icon: <RiNotification2Fill size={18} />,
        single: true,
        href: "/setting/notification-setting",
      },
    ],
  },
];
