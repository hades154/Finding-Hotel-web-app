import { IoBarChartSharp, IoInformationCircleOutline } from "react-icons/io5";
import { FcCalendar } from "react-icons/fc";
import { FaWpforms, FaAddressBook, FaMapMarkedAlt } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { AiFillHome, AiOutlineUsergroupAdd } from "react-icons/ai";
import { GiArchiveResearch } from "react-icons/gi";

const links = [
  {
    id: 1,
    text: "home",
    path: "/",
    icon: <AiFillHome />,
  },
  {
    id: 2,
    text: "find",
    path: "find",
    icon: <GiArchiveResearch />,
  },
  {
    id: 3,
    text: "Add post",
    path: "addpost",
    icon: <FaAddressBook />,
  },

  {
    id: 4,
    text: "find roommate",
    path: "add-job",
    icon: <AiOutlineUsergroupAdd />,
  },
  {
    id: 5,
    text: "Map",
    path: "profile",
    icon: <FaMapMarkedAlt />,
  },
  {
    id: 6,
    text: "Chat",
    path: "chat",
    icon: <IoMdChatboxes />,
  },
  {
    id: 7,
    text: "Calendar",
    path: "stats",
    icon: <FcCalendar />,
  },
  {
    id: 8,
    text: "Information",
    path: "stats",
    icon: <IoInformationCircleOutline />,
  },
];

export default links;
