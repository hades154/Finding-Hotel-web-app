import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;

  .logo {
    width: 100px;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
  }
  .toggle-button {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
    flex: 1 1 0;
  }
  background: var(--white);
  .button-container {
    position: relative;
  }
  .button-container {
    flex: 1 1 0;
  }
  .button {
    display: flex;
    margin-left: auto;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
    align-items: center;
  }
  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--primary-100);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
    display: flex;
    flex-direction: column;
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-button {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
    padding: 10px 0;
  }
  .logo-text-container {
    flex: 2 1 0;
    text-align: center;
  }
  .logo-text {
    display: none;
    margin: 0;
    text-align: center;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;
export default Wrapper;
