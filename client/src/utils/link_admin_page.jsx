import { AiFillHome, AiOutlineComment } from 'react-icons/ai'
import { BsFillFilePostFill } from 'react-icons/bs'
import { FaUsers } from 'react-icons/fa'
import { MdOutlinePersonAddAlt } from 'react-icons/md'
import { BiAddToQueue } from 'react-icons/bi'

const links = [
  {
    id: 1,
    text: 'dashboard',
    path: '/admin',
    icon: <AiFillHome />,
  },
  {
    id: 2,
    text: 'View All Posts',
    path: '/admin/posts',
    icon: <BsFillFilePostFill />,
  },
  {
    id: 3,
    text: 'Add Post',
    path: '/admin/add_post',
    icon: <BiAddToQueue />,
  },
  {
    id: 4,
    text: 'View All Comments',
    path: '/admin/comments',
    icon: <AiOutlineComment />,
  },
  {
    id: 5,
    text: 'View All Users',
    path: '/admin/users',
    icon: <FaUsers />,
  },
  {
    id: 6,
    text: 'Add User',
    path: '/admin/add_user',
    icon: <MdOutlinePersonAddAlt />,
  },
]

export default links
