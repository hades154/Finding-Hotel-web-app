import Wrapper from '../assets/wrappers/UserBriefPost'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useAppContext } from '../context/appContext'

function UserBriefPost({ post }) {
  let date = moment(post.date)
  date = date.format('MMM Do, YYYY')
  let navigate = useNavigate()
  let id = post._id

  const { setEditPost, user } = useAppContext()
  const clickPost = () => {
    navigate('/detail-post/' + id)
  }

  const infoContent = (
    <div className='info-content'>
      <span className='price-content'>{post.price}</span>
      <span className='area-content'>
        {post.area} m<sup>2</sup>
      </span>
      <span className='position-content'>{post.city.name}</span>
      <span className='time-content'>{date}</span>
    </div>
  )

  const authorContent = (
    <div className='author-content'>
      <img src={post.createdBy.user_ava} alt={post.createdBy.username} />
      <span className='author-name'>{post.createdBy.username}</span>
    </div>
  )

  const editPost = () => {
    setEditPost(id)
    navigate('/addpost')
  }

  return (
    <>
      <Wrapper>
        <div className='post'>
          <div className='flex-row'>
            <div className='post-image'>
              <img src={post.image} alt={post.title} />
            </div>
            <div className='post-content'>
              <div className='main-content' onClick={clickPost}>
                <h5>{post.title}</h5>
                {infoContent}
                <p className='description-content'>{post.description}</p>
              </div>
              {authorContent}
            </div>
          </div>
        </div>
      </Wrapper>
      {post.createdBy._id === user._id && (
        <div className='post__action'>
          <button>
            <BiEdit className='edit-icon' onClick={editPost} />
          </button>
          <button>
            <RiDeleteBin6Line className='remove-icon' />
          </button>
        </div>
      )}
    </>
  )
}

export default UserBriefPost
