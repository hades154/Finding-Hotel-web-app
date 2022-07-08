import styled from "styled-components";

const Wrapper = styled.main`
  text-align: center; 
  font-family: "Comic Sans MS", cursive, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;  
  background-image: url('https://img.freepik.com/free-vector/white-background-with-blue-confetti-celebration-carnival-ribbons_29865-936.jpg?w=1380');
  background-size: cover;
  h1 {
    margin-bottom: 0.5rem;
    font-size: 8rem;
    color: coral;
    font-family: "Comic Sans MS", cursive, sans-serif;
  }
  p {
    margin-top: 0.5rem;
    margin-bottom: 2rem;
    color: var(--grey-500);
    font-size: 2rem;
    color:cornflowerblue;
  }
  button {
    font-size: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-radius: 2rem;
    background-color: crimson;
    border-color: cadetblue;
    color: blanchedalmond;
  }
  button:hover{
    cursor: pointer;
  }

`;

export default Wrapper;