import { useState } from "react";
import Wrapper from "../assets/wrappers/FeedbackForm";
import { FaStar } from "react-icons/fa";
import { Modal, ModalBody } from "reactstrap";
import { useAppContext } from "../context/appContext";

function FeedbackForm({ isOpenPopup, toggle, postId }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [text, setText] = useState("");
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const { writeFeedback } = useAppContext();

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const submitClick = () => {
    writeFeedback(text, currentValue, postId);
    toggle();
  };

  return (
    <Wrapper>
      <Modal isOpen={isOpenPopup} toggle={toggle} className="feedback-modal">
        <ModalBody className="feedback-modal__container">
          <div className="feedback-modal__form">
            <div className="feedback-form__rating">
              <span>Give us your feedback</span>
              <div className="icon-container">
                {stars.map((_, index) => {
                  return (
                    <FaStar
                      key={index}
                      onClick={() => handleClick(index + 1)}
                      onMouseOver={() => handleMouseOver(index + 1)}
                      onMouseLeave={handleMouseLeave}
                      color={
                        (hoverValue || currentValue) > index
                          ? "var(--yellow-dark)"
                          : "var(--grey-300)"
                      }
                      className="icon"
                    />
                  );
                })}
              </div>
            </div>
            <div className="feedback-form__textarea">
              <label htmlFor="feedback-text">Can you tell more about it?</label>
              <textarea
                name="feedback-text"
                id="feedback-text"
                placeholder="This room is..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
            <div className="feedback-form__btns">
              <button
                className="feedback-form__btn feedback-form__btn--primary"
                onClick={submitClick}
              >
                Publish Feedback
              </button>
              <button
                className="feedback-form__btn feedback-form__btn--grey"
                onClick={toggle}
              >
                Cancel
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Wrapper>
  );
}

export default FeedbackForm;
