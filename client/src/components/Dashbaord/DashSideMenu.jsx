import { BsCalendar3EventFill , BsMegaphoneFill, BsNewspaper, BsJournalBookmarkFill, BsFillGrid1X2Fill, BsPeopleFill  } from "react-icons/bs";
import { FaImages, FaUser, FaUsers  } from "react-icons/fa6";
import { MdEventNote, MdMiscellaneousServices  } from "react-icons/md";
import { FaQuestionCircle, FaBook, FaMedal  } from "react-icons/fa";

const dashsidedata = [
    {
        id: 1,
        name: "Dashboard",
        icon: BsFillGrid1X2Fill,
        link: '/Dashboard/Home'
    },
    {
        id: 2,
        name: "User Management",
        icon: BsPeopleFill,
        link: '/Dashboard/UserManagement'
    },
    {
        id: 3,
        name: "Event Management",
        icon: BsCalendar3EventFill,
        link: '/Dashboard/Events'
    },
    {
        id: 4,
        name: "Notice Management",
        icon: BsMegaphoneFill,
        link: '/Dashboard/Notice'
    },
    {
        id: 5,
        name: "NEWS Management",
        icon: BsNewspaper,
        link: '/Dashboard/NEWS'
    },
    {
        id: 6,
        name: "Research Management",
        icon: BsJournalBookmarkFill,
        link: '/Dashboard/Research'
    },
    {
        id: 7,
        name: "Home Image Management",
        icon: FaImages,
        link: '/Dashboard/HSliderImg'
    },
    {
        id: 8,
        name: "Latest Programme Management",
        icon: MdEventNote,
        link: '/Dashboard/ProgramSlider'
    },
    {
        id: 9,
        name: "FAQ",
        icon: FaQuestionCircle,
        link: '/Dashboard/FAQ'
    },
    {
        id: 10,
        name: "Diploma",
        icon: FaBook,
        link: '/Dashboard/Diploma'
    },
    {
        id: 11,
        name: "Certificates",
        icon: FaMedal,
        link: '/Dashboard/Certificates'
    },
    {
        id: 12,
        name: "Societies",
        icon: FaUsers,
        link: '/Dashboard/Societies'
    },
    {
        id: 13,
        name: "Services & Quicklinks",
        icon: MdMiscellaneousServices,
        link: '/Dashboard/ServicesQuicklinks'
    },
    {
        id: 14,
        name: "Profile",
        icon: FaUser,
        link: '/Dashboard/Profile'
    },
];

export { dashsidedata };