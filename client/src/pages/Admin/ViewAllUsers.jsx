import React, { useEffect } from "react";
import styled from "styled-components";
import { DeleteNoti } from "../../components/Admin";
import { useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";

function ViewAllUsers() {
  let navigate = useNavigate();

  const [isDelete, setIsDelete] = useState(false);
  const [userDeleteId, setUserDeleteId] = useState();
  const [users, setUsers] = useState([]);

  const { setEditUser } = useAppContext();

  const toggle = () => {
    setIsDelete(!isDelete);
  };
  const chooseUserDelete = (userId) => {
    setUserDeleteId(userId);
    toggle();
  };

  const editUser = (id) => {
    setEditUser(id);
    navigate("/admin/add_user");
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios("/api/auth/getProfiles  ");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllUsers();
  }, []);

  return (
    <Wrapper>
      <h2 className="title">View All Users</h2>
      <form className="sort_form">
        <strong style={{ color: "var(--primary-500)" }}>Filter by</strong>
        <select name="sort" id="sort">
          <option value="all_user">All Users</option>
        </select>
        <button className="sort_btn">Filter</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Address</th>
            <th>Role</th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.address}</td>
              <td>
                <select name={`role_of_${user.id}`} id={`role_of_${user.id}`}>
                  <option value={user.role}>{user.role}</option>
                  {user.role === "admin" ? (
                    <option value="user">user</option>
                  ) : (
                    <option value="admin">admin</option>
                  )}
                </select>
              </td>
              <td>
                <a onClick={(e) => editUser(user._id)} className="edit__link">
                  Edit
                </a>
              </td>
              <td>
                <span
                  className="delete__link"
                  onClick={(e) => chooseUserDelete(user._id)}
                >
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
          deleteObject="user"
          userDeleteId={userDeleteId}
          users={users}
          setUsers={setUsers}
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

export default ViewAllUsers;
