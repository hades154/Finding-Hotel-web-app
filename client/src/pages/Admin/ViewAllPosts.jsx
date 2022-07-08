import React from "react";
import styled from "styled-components";
import { DeleteNoti } from "../../components/Admin";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";

function ViewAllPosts() {
  const [isDelete, setIsDelete] = useState(false);
  const [posts, setPosts] = useState([]);
  const toggle = () => {
    setIsDelete(!isDelete);
  };

  useEffect(() => {
    const getAllPosts = async () => {
      const res = await axios.get("/api/post");
      setPosts(res.data);
    };
    getAllPosts();
  }, []);

  return (
    <Wrapper>
      <h2 className="title">View All Posts</h2>
      <div>
        <form className="sort_form">
          <strong style={{ color: "var(--primary-500)" }}>Filter by</strong>
          <select name="sort" id="sort">
            <option value="all_post">All Posts</option>
          </select>
          <button className="sort_btn">Filter</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Author</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Image</th>
            <th>Price (VND)</th>
            <th>Area</th>
            <th>Feature</th>
            <th>Date</th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{post.createdBy.username}</td>
              <td>{post.title}</td>
              <td>{post.category}</td>
              <td>
                <select
                  name={`status_of_${post.id}`}
                  id={`status_of_${post.id}`}
                >
                  <option value={post.status}>{post.status}</option>
                  {post.status === "published" ? (
                    <option value="draft">draft</option>
                  ) : (
                    <option value="published">published</option>
                  )}
                </select>
              </td>
              <td>
                <img
                  width="100"
                  height="70"
                  src={post.image}
                  alt={post.title}
                />
              </td>
              <td style={{ textAlign: "right" }}>{post.price}</td>
              <td>
                {post.area}m<sup>2</sup>
              </td>
              <td>
                {" "}
                <select
                  name={`feature_of_${post.id}`}
                  id={`feature_of_${post.id}`}
                >
                  <option value={post.feature}>{post.feature}</option>
                  {post.feature === "hot" ? (
                    <option value="new">New</option>
                  ) : (
                    <option value="hot">Hot</option>
                  )}
                </select>
              </td>
              <td>{moment(post.date).format("MMM Do, YYYY")}</td>
              <td>
                <a href="/admin/posts" className="edit__link">
                  Edit
                </a>
              </td>
              <td>
                <span className="delete__link" onClick={toggle}>
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
          deleteObject="post"
        />
      )}
    </Wrapper>
  );
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
    text-align: center;
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

  .sort_form {
    margin-bottom: 1rem;
    display: flex;
    gap: 0.7rem;
    align-items: center;

    select {
      min-width: 10rem;
      padding: 0.3rem 1rem;
      font-size: 14px;
    }

    .sort_btn {
      padding: 0.5rem 1rem;
      font-size: 14px;
      border: none;
      outline: none;
      background: var(--primary-500);
      color: var(--white);
      border-radius: 5px;
    }
  }
`;

export default ViewAllPosts;
