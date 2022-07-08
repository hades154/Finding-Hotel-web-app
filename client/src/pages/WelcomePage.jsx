import Wrapper from "../assets/wrappers/WelcomePage";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={logo} width="656" height="200"  />
        <h1>Welcome!!!</h1>
        <p>Congratulations, you have successfully registered.</p>
        <Link to="/"><button>Continue</button></Link>
      </div>
    </Wrapper>
  );
};

export default Welcome;
