import Wrapper from '../../assets/wrappers/Admin/Widget'
import { FiUser } from 'react-icons/fi'
import { BsFillFilePostFill } from 'react-icons/bs'
import { FaRegCommentAlt } from 'react-icons/fa'
import { IoIosArrowUp } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

function Widget({ type }) {
  let data

  switch (type) {
    case 'user':
      data = {
        title: 'USERS',
        link: 'View all users',
        path: '/admin/users',
        amount: '100',
        diff: '50',
        color: '#E15554',
        icon: (
          <FiUser
            className='icon'
            style={{
              backgroundColor: 'rgba(225, 85, 84,0.2)',
              color: '#E15554',
            }}
          />
        ),
      }
      break
    case 'post':
      data = {
        title: 'POSTS',
        link: 'View all posts',
        path: '/admin/posts',
        amount: '200',
        diff: '10',
        color: '#E1BC29',
        icon: (
          <BsFillFilePostFill
            className='icon'
            style={{
              backgroundColor: 'rgba(225, 188, 41, 0.2)',
              color: '#E1BC29',
            }}
          />
        ),
      }
      break
    case 'comment':
      data = {
        title: 'COMMENTS',
        link: 'View all comments',
        path: '/admin/comments',
        amount: '150',
        diff: '20',
        color: '#053C5E',
        icon: (
          <FaRegCommentAlt
            className='icon'
            style={{
              backgroundColor: 'rgba(5, 60, 94, 0.2)',
              color: '#053C5E',
            }}
          />
        ),
      }
      break
    default:
      break
  }

  return (
    <Wrapper>
      <div className='widget'>
        <div className='left'>
          <span className='title'>{data.title}</span>
          <span className='counter' style={{ color: data.color }}>
            {data.amount}
          </span>
          <NavLink className='link' to={data.path}>
            {data.link}
          </NavLink>
        </div>
        <div className='right'>
          <div className='percentage positive'>
            <IoIosArrowUp />
            {data.diff} %
          </div>
          {data.icon}
        </div>
      </div>
    </Wrapper>
  )
}

export default Widget
