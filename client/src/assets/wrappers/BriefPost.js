import styled from "styled-components";

const Wrapper = styled.div`
  background-color: var(--white);
  width: 100%;

  .post {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid var(--primary-600);
    border-radius: 0.15rem;
    gap: 2rem;
    justify-content: space-around;

    * {
      margin: 0;
    }
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .post-image {
    width: 30%;
    padding-bottom: 25%;
    border-radius: 0.3rem;
    position: relative;
    height: 0;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 0.3rem;
      object-fit: cover;
    }
  }

  .post-content {
    width: 65%;
    position: relative;

    h5 {
      font-size: 1.2em;
      color: var(--primary-600);
      cursor: pointer;
    }

    .description-content {
      font-size: 0.9rem;
      color: var(--grey-500);
      margin-bottom: 2.5rem;
    }
  }

  .info-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0.5rem 0rem;
    width: 100%;

    .price-content {
      color: var(--yellow-dark);
      border-bottom: 1px solid var(--yellow-dark);
    }

    .area-content,
    .position-content {
      color: var(--grey-700);
      border-bottom: 1px solid var(--grey-700);
    }

    .time-content {
      color: var(--grey-400);
      margin-right: 1rem;
    }
  }

  .author-content {
    display: flex;
    position: absolute;
    bottom: 0px;
    gap: 0.5rem;
    width: 100%;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
    }
    span {
      text-transform: capitalize;
      color: var(--grey-400);
    }
    .author-name {
      cursor: pointer;
    }
    .author-phone {
      margin-left: auto;
      border: 1px solid var(--primary-500);
      border-radius: 3px;
      color: var(--primary-500);
      padding: 0 0.5rem;
    }
    .contact-content {
      margin-right: 1rem;
      margin-left: 0.5rem;
      border: 1px solid var(--primary-500);
      border-radius: 3px;
      background: var(--primary-500);
      color: var(--white);
      padding: 0 0.5rem;
    }
  }
`;

export default Wrapper;
