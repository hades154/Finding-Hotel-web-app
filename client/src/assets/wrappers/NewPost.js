import styled from "styled-components";

const Wrapper = styled.main`
  text-align: left; 
  display: flex;  
  align-items: center;
  justify-content: center;   
  font-size: 16px;
  font-family: Roboto;
  margin-left: auto;
  margin-right: auto;
  label{
    width:25%;
  }
  h1{
    text-align: center;   
    color: #243A73; 
    font-weight: bold;
    margin-bottom: 2rem;
  }
  .form-control{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    margin-top: 12px;
    margin-bottom: 12px;
    width: 60vw;
  }

  .multi-input-image {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .input-group {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      margin-top: 12px;
    }

    .multi-preview {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 1rem;
      width: 80%;
      margin: 0 0 12px auto;

      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
          rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      }
    }
  }
  

`;

export default Wrapper;