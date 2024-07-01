import { TfiHome } from "react-icons/tfi";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { RiNotification2Fill, RiSettings5Line, RiDeviceRecoverFill, RiDeviceRecoverLine, RiDeviceLine, RiDeviceFill } from "react-icons/ri";
import { BsFilePdfFill } from "react-icons/bs";
import { MdAdminPanelSettings, MdManageAccounts, MdOnDeviceTraining } from "react-icons/md";
import { CgUserList } from "react-icons/cg";
import { FcSalesPerformance } from "react-icons/fc";
import { TbActivity } from "react-icons/tb";
import { MdOutlineCoPresent } from "react-icons/md";

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
    name: "Users",
    navData: [
      {
        id: 1,
        name: "User List",
        icon: <FaUsers size={18} />,
        single: true,
        href: "/user-list",
      },
      {
        id: 2,
        name: "Create User",
        icon: <FaUserPlus size={18} />,
        single: true,
        href: "/create-user",
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
        href: "/role-list",
      },
      {
        id: 2,
        name: "Permission List",
        single: true,
        icon: <MdAdminPanelSettings size={18} />,
        href: "/permission-list",
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
        name: "Survey Report",
        icon: <TbActivity size={18} />,
        single: true,
        href: "/survey-report",
      },
      {
        id: 2,
        name: "Performance Report",
        icon: <FcSalesPerformance size={18} />,
        single: true,
        href: "/performance-report",
      },
      {
        id: 3,
        name: "Attendance Report",
        icon: <MdOutlineCoPresent size={18} />,
        single: true,
        href: "/attendance-report",
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
        name: "General Settings",
        icon: <RiSettings5Line size={18} />,
        single: true,
        href: "/setting/general-setting",
      },
    ],
  },
  {
    id: 6,
    single: false,
    icon: <RiNotification2Fill size={18} />,
    name: "Notification",
    navData: [
      {
        id: 1,
        name: "Survey Notifications",
        icon: <RiSettings5Line size={18} />,
        single: true,
        href: "/notification/survey-notification",
      },
      {
        id: 2,
        name: "Push Notification",
        icon: <RiNotification2Fill size={18} />,
        single: true,
        href: "/notification/push-notification",
      },
    ],
  },
  {
    id: 7,
    single: false,
    icon: <RiDeviceFill size={18} />,
    name: "Device Servicing",
    navData: [
      {
        id: 1,
        name: "Device Issues",
        icon: <RiDeviceLine size={18} />,
        single: true,
        href: "/device/issues",
      },
      {
        id: 2,
        name: "Device Services",
        icon: <MdOnDeviceTraining size={18} />,
        single: true,
        href: "/device/services",
      },
    ],
  },
];
