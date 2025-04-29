import { MdDashboard } from "react-icons/md";
import { FaUserGraduate, FaUsers, FaBookOpen, FaRegCalendarAlt, FaClipboardList } from "react-icons/fa";
import { FaBuildingColumns, FaBook, FaTableList } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";

const dashsidedata = [
    {
        id: 1,
        name: 'Dashboard',
        link: '/Dashboard/Home',
        icon: MdDashboard
    },
    {
        id: 2,
        name: 'Courses',
        link: '/Dashboard/Courses',
        icon: FaBookOpen
    },
    {
        id: 3,
        name: 'Departments',
        link: '/Dashboard/Departments',
        icon: FaBuildingColumns
    },
    {
        id: 4,
        name: 'Semesters',
        link: '/Dashboard/Semesters',
        icon: FaRegCalendarAlt
    },
    {
        id: 5,
        name: 'Subjects',
        link: '/Dashboard/Subjects',
        icon: FaBook
    },
    {
        id: 6,
        name: 'Students',
        link: '/Dashboard/Students',
        icon: FaUserGraduate
    },
    {
        id: 7,
        name: 'Results',
        link: '/Dashboard/Results',
        icon: FaTableList
    },
    {
        id: 8,
        name: 'Users',
        link: '/Dashboard/Users',
        icon: FaUsers
    },
    {
        id: 9,
        name: 'Profile',
        link: '/Dashboard/Profile',
        icon: FaUserCog
    },
];

export { dashsidedata };