import styled from "styled-components";

const Wrapper = styled.div`
  flex: 1;
  .widget {
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 20px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    border-radius: 10px;
    height: auto;
    background: #fff;

    .left {
      align-items: flex-start;
    }

    .left,
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        font-weight: bold;
        font-size: 14px;
        color: rgb(160, 160, 160);
      }

      .counter {
        font-size: 28px;
        font-weight: 300;
      }

      .link {
        color: gray;
        text-decoration: none;
        width: max-content;
        font-size: 14px;
        border-bottom: 1px solid gray;
        cursor: pointer;
      }

      .link:hover {
        color: var(--primary-700);
        border-bottom: 1px solid var(--primary-700);
      }

      .percentage {
        display: flex;
        align-items: center;
        font-size: 14px;

        &.positive {
          color: green;
        }
        &.negative {
          color: red;
        }
      }

      .icon {
        font-size: 50px;
        padding: 5px;
        border-radius: 5px;
        align-self: flex-end;
      }
    }
  }
`
export default Wrapper