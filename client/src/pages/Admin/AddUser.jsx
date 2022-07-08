import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import axios from "axios";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  address: "",
  phone_number: "",
};

function AddUser() {
  const [user, setUser] = useState(initialState);

  const { editUserId, isEditingUser } = useAppContext();
  useEffect(() => {
    const getUserById = async () => {
      try {
        const res = await axios("/api/users?userId=" + editUserId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (isEditingUser) {
      getUserById();
    }
  }, [editUserId]);
  return (
    <Wrapper>
      {isEditingUser ? (
        <h2 className="title">Update User</h2>
      ) : (
        <h2 className="title">Add User</h2>
      )}
      <form className="form">
        <div className="input-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Please enter first name"
            value={user.firstName}
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Please enter last name"
            value={user.lastName}
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Please enter username"
            value={user.username}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Please enter email"
            value={user.email}
          />
        </div>
        <div className="input-group">
          <label htmlFor="address">Address</label>
          <input
            type="address"
            id="address"
            placeholder="Please enter address"
            value={user.address}
          />
        </div>
        <div className="input-group">
          <label htmlFor="phone">Phone number</label>
          <input
            type="phone"
            id="phone"
            placeholder="Please enter phone"
            value={user.phone_number}
          />
        </div>
        {!isEditingUser && (
          <>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Please enter password"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password-confirm">Confirm password</label>
              <input
                type="password"
                id="password-confirm"
                placeholder="Please re-enter password"
              />
            </div>
          </>
        )}

        <div>
          {isEditingUser ? (
            <button type="submit" className="form__btn--submit">
              Update user
            </button>
          ) : (
            <button type="submit" className="form__btn--submit">
              Add User
            </button>
          )}
        </div>
      </form>
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

  .form {
    .input-group {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;

      label {
        padding-right: 2rem;
        margin-right: auto;
        color: var(--primary-500);
        font-size: 18px;
        font-weight: 500;
        border-bottom: 1px solid var(--primary-500);
      }

      input {
        width: 80%;
        border: 1px solid var(--grey-500);
        outline: none;
        padding: 0.5rem 1rem;
        line-height: 20px;
        border-radius: 5px 5px 5px 5px;
      }

      input:focus {
        border: 1px solid var(--primary-500);
        background: #f8f9fa;
      }
    }

    &__btn--submit {
      padding: 0.5rem 2rem;
      border: none;
      outline: none;
      background: var(--primary-500);
      color: var(--white);
      border-radius: 5px;
      margin-top: 1rem;
    }
  }
`;

export default AddUser;
