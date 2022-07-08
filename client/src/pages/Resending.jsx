import img from "../assets/images/logo.svg";
import img1 from "../assets/images/handshake.png";
import Wrapper from "../assets/wrappers/ResendingPage";

const Resending = () => {
  return (
    <Wrapper className="full-page">
      <div>
      <div className='image'>
      <img src={img} width="650" height="150" alt="logo" />
      </div>
     <div className='ResendContainer'>
       
       <h1>you're almost done!</h1>
       <div className='image1'>
      <img src={img1} alt="log" />
      </div>
       <p>We send a actived link to your mail. Please check your mail to see it !!!</p>
       <h>Didn't get your email? Click this button to resend your actived link</h>
       <div className='resendButton'>
       <button>RESEND</button>
       </div>
     </div>
    </div>
    </Wrapper>
  );
};

export default Resending;
