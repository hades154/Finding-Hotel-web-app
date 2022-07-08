import React, { useState } from "react";
import { Menu, Filter, PostsContainer } from "../../components";
import styled from "styled-components";

function HomePage() {
  const [openMenuItem, setOpenMenuItem] = useState(-1);

  function toggle(id) {
    setOpenMenuItem((prevId) => (prevId < 0 ? id : id * -1));
  }

  if (openMenuItem === 1) {
    return (
      <Wrapper>
        <div className="container">
          <Menu toggle={toggle} />
          <Filter />
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="container">
        <Menu toggle={toggle} />
        <PostsContainer />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  .container {
    width: 100%;
  }
  .contents {
    display: flex;
    padding: 1rem 0;

    h3 {
      text-align: center;
      color: var(--primary-600);
      margin-top: 1rem;
    }
  }

  .hot-content {
    width: 70%;
    background: var(--white);
    margin-right: 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }

  .new-content {
    width: 30%;
    background: var(--white);
    margin-left: 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }

  .posts {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

export default HomePage;
