import styled from "styled-components"

const Wrapper = styled.div`
  with: inherit;
  .menu {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .menu-item { 
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-600);
    width: 20%;
    text-transform: capitalize;
    transition: var(--transition);
    border: 2px solid var(--primary-600);
    background: var(--white);
    margin: 1rem 0;
    padding: 0.5rem 0;
  }
  .menu-item:hover {
    color: var(--white);
    background: var(--primary-600)
  }
  .menu-item:hover .icon {
    color: var(--white);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
`

export default Wrapper