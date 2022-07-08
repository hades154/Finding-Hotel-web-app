import React from 'react'
import styled from 'styled-components'
import comments from '../../utils/comment'
import { DeleteNoti } from '../../components/Admin'
import { useState } from 'react'

function ViewAllComments() {
  const [isDelete, setIsDelete] = useState(false)
  const toggle = () => {
    setIsDelete(!isDelete)
  }

  return (
    <Wrapper>
      <h2 className='title'>View All Comments</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Author</th>
            <th>Comment</th>
            <th>Email</th>
            <th>Status</th>
            <th>In response to</th>
            <th>Date</th>
            <th colspan='2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr>
              <td>{comment.id}</td>
              <td>{comment.author}</td>
              <td>{comment.comment}</td>
              <td>{comment.email}</td>
              <td>
                <select
                  name={`status_of_${comment.id}`}
                  id={`status_of_${comment.id}`}
                >
                  <option value={comment.status}>{comment.status}</option>
                  {comment.status === 'approved' ? (
                    <option value='unapproved'>unapproved</option>
                  ) : (
                    <option value='approved'>approved</option>
                  )}
                </select>
              </td>
              <td>
                <a href='/admin/comments' className='post__link'>
                  Post {comment.post_id}
                </a>
              </td>
              <td>{comment.date}</td>
              <td>
                <a href='/admin/comments' className='edit__link'>
                  Edit
                </a>
              </td>
              <td>
                <span className='delete__link' onClick={toggle}>
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDelete && (
        <DeleteNoti
          isOpenPopup={isDelete}
          toggle={toggle}
          deleteObject='comment'
        />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.main`
  margin: 0 0 1rem;
  width: 100%;

  .title {
    text-align: left;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin: 0 0 1.5rem 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }

  th,
  td {
    text-align: left;
    padding: 8px;
  }

  th:first-child,
  td:first-child {
    padding-left: 1rem;
  }
  th:last-child,
  td:last-child {
    padding-right: 1rem;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  th {
    background-color: var(--primary-500);
    color: white;
  }

  td {
    color: var(--grey-700);
  }

  select {
    border: 1px solid var(--grey-200);
    border-radius: 3px;
    padding: 0.2rem;
    color: var(--grey-700);
    font-size: 14px;
  }

  .edit__link,
  .delete__link {
    text-decoration: underline;
    cursor: pointer;
  }

  .edit__link {
    color: var(--yellow-dark);
  }

  .delete__link {
    color: var(--red-dark);
  }

  .post__link {
    color: var(--primary-500);
  }
`

export default ViewAllComments
