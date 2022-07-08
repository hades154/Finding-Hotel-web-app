import styled from "styled-components";
import { Profile } from "../../pages/Dashboard";

const Wrapper = styled.main`
  position: relative;

  .profile-header {
    position: relative;
    background-color: white;

    .profile-background {
      height: 20vh;
      background: url("https://wallpaperaccess.com/full/1129092.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      position: relative;
 
      .profile-ava img {
        border-radius: 50%;
        width: 150px;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, -50%);
        object-fit: cover;
      }
    }

    .profile-info {
      height: 50vh;
      padding: 70px 0 0 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid #dee2e6;

      p {
        margin: 0;
        margin-top: 10px;
        color: #20b2aa;
      }
    }

    .profile-nav {
      height: 10vh;
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      .nav-list {
        display: flex;
        align-items: center;

        .nav-item {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--black);
          text-transform: capitalize;
          transition: var(--transition);
        }
      }

      .nav-left {
        margin-right: auto;

        .nav-item {
          padding: 0 2rem;
        }

        .nav-item:hover {
          color: var(--primary-600);
          border-bottom: 3px solid var(--primary-600);
        }
      }

      .nav-right {
        margin-left: auto;
        gap: 1rem;

        .chat-btn {
          background: var(--yellow-dark);
          outline: none;
          border: 1px solid var(--yellow-dark);
          color: var(--white);
          padding: 0.5rem 2rem;
          border-radius: 3px;
          cursor: pointer;
        }

        .follow-btn {
          background: var(--white);
          outline: none;
          border: 1px solid var(--primary-500);
          color: var(--primary-500);
          padding: 0.5rem 2rem;
          border-radius: 3px;
          cursor: pointer;
        }

        .more-btn {
          background: var(--white);
          color: var(--black);
          width: 5px;
          outline: none;
          border: none;
          cursor: pointer;
        }
      }
    }
  }

  .profile-content {
    max-width: 900px;
    margin: 2rem auto;

    .content-header {
      display: flex;
      justify-content: space-between;
    }

    .content-main {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
`;

export default Wrapper;
