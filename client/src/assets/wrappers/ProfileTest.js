import styled from "styled-components";

const Wrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: space-between;
  max-width: 1440px;
  margin: 2rem auto;

  .container--left,
  .container--right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-start;
  }
  .container--left {
    width: 30%;
  }
  .container--right {
    width: 65%;
  }

  .user__info,
  .user__social,
  .user__view-more,
  .user__form,
  .user__post {
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    padding: 2rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 5px;
  }

  .user__info {
    text-align: center;

    .ava {
      width: 70%;
      position: relative;
      padding-bottom: 70%;
      margin-bottom: 10px;

      img {
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
          rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      }

      .input-ava {
        border: 1px solid #d0d7de;
        border-radius: 7px;
        background-color: var(--white);
        color: var(--grey-800);
        position: absolute;
        bottom: 5%;
        right: 10%;
        transform: translateX(10%);
        padding: 2px 7px;

        &:hover {
        color: var(--grey-600);
        }

        label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1px;
          cursor: pointer;
          font-size: 1rem;
        }

        input {
          display: none;
        }
      }
    }

    .name {
      font-weight: 700;
      color: var(--primary-700);
      font-size: 20px;
    }

    .intro {
      color: var(--grey-500);
      font-size: 16px;
    }

    .action {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 0.5rem;

      .btn--follow,
      .btn--message {
        width: 45%;
        padding: 10px;
        border-radius: 3rem;
        font-size: 16px;
      }

      .btn--follow {
        background: var(--primary-500);
        color: var(--white);
        border: 1px solid var(--primary-500);
      }

      .btn--message {
        background: var(--white);
        color: var(--primary-500);
        border: 1px solid var(--grey-500);
      }
    }
  }

  .user__social {
    padding: 0.5rem 2rem;
    ul {
      margin: 0;
      padding: 0;
      width: 100%;
      li {
        display: flex;
        justify-content: space-between;
        position: relative;

        &:not(:last-child) {
          margin-bottom: 0.5rem;

          &::after {
            content: "";
            width: 100%;
            height: 1px;
            background-color: var(--grey-100);
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
          }
        }
        span:first-child {
          color: var(--grey-700);
        }

        span:last-child {
          color: var(--grey-300);
        }
      }
    }
  }

  .user__view-more {
    text-align: center;
    a {
      color: var(--primary-700);
      text-decoration: underline;
      text-transform: capitalize;
    }
  }

  .user__form {
    padding: 2rem 4rem;
    form {
      width: 100%;
      .form-input-group {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;

        label {
          color: var(--primary-500);
          padding: 10px 2rem 10px 0;
          border-bottom: 1px solid var(--grey-100);
        }

        input {
          width: 70%;
          border: none;
          background: var(--white);
          font-family: inherit;
          color: var(--grey-700);
          padding: 1px 15px;
          border: 1px solid var(--white);
          transition: 0.2s;
          line-height: calc(100% - 2px);
        }

        .input-text {
          border-bottom: 1px solid var(--primary-500);
        }
        .input-form {
          border: 1px solid var(--primary-500);
          border-radius: 5px;

          &:focus-visible {
            outline: 1px solid var(--grey-700);
          }
        }
      }

      .action-form {
        display: flex;
        justify-content: flex-end;
        gap: 2rem;

        .edit-btn,
        .submit-btn {
          padding: 7px 10px;
          border-radius: 3px;
          min-width: 80px;
          font-size: 16px;
          background: var(--primary-500);
          color: var(--white);
          border: 1px solid var(--primary-500);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: 0.2s;
        }
      }
    }
  }

  .user__post {
    .post__container {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      width: 100%;

      .post__action {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        button {
          width: 50px;
          height: 50px;
          border: none;
          background: var(--white);
          box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
            rgba(0, 0, 0, 0.24) 0px 1px 2px;
          border-radius: 5px;

          .edit-icon {
            font-size: 30px;
            color: var(--yellow-dark);
          }

          .remove-icon {
            font-size: 30px;
            color: var(--red-dark);
          }
        }
      }
    }
  }
`;

export default Wrapper;
