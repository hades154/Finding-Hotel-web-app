import { useState } from "react";
import styled from "styled-components";
import { ImageSlider, FeedbackForm, RatingStar } from "../../components";
import SliderData from "../../utils/sliderData";
import { BsStarFill, BsStar } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import {
  AiFillWechat,
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
  AiOutlineLeft,
} from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";

function DetailPost(props) {
  let { id } = useParams();
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);
  const [detailPost, setDetailPost] = useState([]);
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [user, setUser] = useState([]);
  const [reviews, setReviews] = useState([]);
  const toggleFeedbackForm = () => {
    setIsFeedbackFormOpen(!isFeedbackFormOpen);
  };

  useEffect(() => {
    const getPostById = async () => {
      const res = await axios.get("/api/post/" + id);
      setDetailPost(res.data);
      setCity(res.data.city);
      setDistrict(res.data.district);
      setWard(res.data.ward);
      setUser(res.data.createdBy);
    };
    const getReviewOfPost = async () => {
      const res = await axios.get("/api/post/review/" + id);
      setReviews(res.data);
    };
    getPostById();
    getReviewOfPost();
  }, [id]);

  return (
    <Wrapper>
      <div className="flex-row align-center space-between nav-menu">
        <div className="nav-path">
          {city.name}
          <AiOutlineLeft className="icon" />
          {district.name}
          <AiOutlineLeft className="icon" />
          {ward.name}
        </div>
        <div className="nav-btns flex-row space-between">
          <div className="btn-left">
            <AiOutlineCaretLeft className="icon icon-left" />
            Back to list
          </div>
          <div className="btn-right icon-right">
            Next post
            <AiOutlineCaretRight className="icon icon-right" />
          </div>
        </div>
      </div>
      <div className="detail-post-container flex-row align-start space-between">
        <div className="post-container flex-column">
          <div className="post-slide">
            <ImageSlider slides={SliderData} />
          </div>
          <div className="post-content flex-column">
            <span>
              <b>Title: </b> {detailPost.title}
            </span>
            <div className="flex-row">
              <span style={{ flex: "1" }}>
                <b>Price:</b> {detailPost.price}$
              </span>
              <span style={{ flex: "1" }}>
                <b>Deposit:</b> {detailPost.deposit}$
              </span>
            </div>
            <span>
              <b>Area:</b> {detailPost.area}m<sup>2</sup>
            </span>
            <span>
              <b>Description:</b>
              {detailPost.description}
            </span>
            <span className="flex-row align-center">
              <b>Rating:</b>
              <div className="icon-container">
                {/* <BsStarFill className="icon icon-star" />
                <BsStarFill className="icon icon-star" />
                <BsStarFill className="icon icon-star" />
                <BsStarFill className="icon icon-star" />
                <BsStar className="icon icon-star" /> */}
                <RatingStar valueStar={3} />
              </div>
            </span>
            <span>
              <b>Contact number:</b>
              {detailPost.phone_number}
            </span>
          </div>
        </div>
        <div className="author-container flex-column">
          <div className="author-info flex-row align-center">
            <img src={user.user_ava} alt="user-name" className="ava" />
            <div className="flex-column">
              <span className="name">{user.username}</span>
              <span className="time-active">Active 5 minutes ago</span>
            </div>
            <div></div>
          </div>
          <div className="author-contact-container flex-column align-center justify-center">
            <div className="author-phone flex-row align-center">
              <span className="icon-container">
                <FiPhoneCall className="icon icon-phone" />
              </span>
              <span className="phone">{user.phone_number}</span>
              <span style={{ marginLeft: "1rem" }}>Click to see full..</span>
            </div>
            <div className="author-chat flex-row align-center">
              <span className="icon-container">
                <AiFillWechat className="icon icon-chat" />
              </span>
              <span>Chat with Seller</span>
            </div>
          </div>
          <div className="feedback-container">
            <div className="flex-row align-center space-between">
              <div className="flex-column justify-center align-start">
                <span>
                  <b>15</b> customer reviews
                </span>
                <div className="icon-container">
                  <BsStarFill className="icon icon-star" />
                  <BsStarFill className="icon icon-star" />
                  <BsStarFill className="icon icon-star" />
                  <BsStarFill className="icon icon-star" />
                  <BsStar className="icon icon-star" />
                </div>
              </div>
              <div className="feedback-btn flex-row align-center">
                <span className="icon-container">
                  <AiFillWechat className="icon icon-chat" />
                </span>
                <span onClick={toggleFeedbackForm}>Leave a feedback</span>
              </div>
            </div>
            <FeedbackForm
              isOpenPopup={isFeedbackFormOpen}
              toggle={toggleFeedbackForm}
              postId={id}
            />
          </div>
          <div className="post-comment">
            <h6>Comment about this post</h6>
            <div className="comment-list">
              {reviews.length !== 0 ? (
                reviews.map((review) => (
                  <div className="comment-item">
                    <div className="flex-row align-center">
                      <img
                        src={review.avatar}
                        alt="user-name"
                        className="ava"
                      />
                      <div className="flex-column justify-center">
                        <span className="comment-author">
                          {review.username}
                        </span>
                        <span className="comment-time">
                          {format(review.createdAt)}
                        </span>
                      </div>
                      <div className="rating">
                        <span className="flex-row align-center">
                          <span>Rating:</span>
                          <div className="icon-container">
                            <RatingStar valueStar={review.rating} />
                          </div>
                        </span>
                      </div>
                    </div>
                    <div className="comment-content">{review.text}</div>
                  </div>
                ))
              ) : (
                <div>No feedback for this post</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 3rem;
  margin: 2rem auto;
  border-radius: 5px;

  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .align-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .align-start {
    align-items: flex-start;
  }

  .space-between {
    justify-content: space-between;
  }

  .nav-menu {
    .nav-path {
      color: var(--primary-500);
      font-weight: bold;
      cursor: pointer;
    }
    .nav-btns {
      gap: 1rem;

      .btn-left,
      .btn-right {
        padding: 0.2rem 1rem;
        background: var(--primary-500);
        color: var(--white);
        border: 1px solid var(--primary-500);
        border-radius: 20px;
        cursor: pointer;
      }

      .icon-left {
        margin-left: 0.2rem;
      }
      .icon-right {
        margin-left: 0.2rem;
      }
    }
  }

  .detail-post-container {
    width: 100%;
    gap: 3rem;
    padding: 2rem 0;
  }

  .post-container {
    flex: 1;
    justify-content: flex-start;

    .post-slide {
      margin-bottom: 1rem;
    }

    .post-content {
      padding: 0 1rem;

      span {
        border-bottom: 1px solid var(--primary-500);
        margin-top: 1rem;
        font-size: 1.1rem;
      }
    }
  }

  .icon {
    margin-right: 0.2rem;
  }

  .icon-container {
    margin: 0 0.5rem;
  }

  .icon-star {
    color: var(--yellow-dark);
  }

  .icon-phone {
    color: inherit;
    font-size: 1.5rem;
  }

  .icon-chat {
    color: inherit;
    font-size: 1.5rem;
  }

  .author-container {
    border: 2px solid var(--primary-500);
    border-radius: 10px;
    padding: 1rem;
    flex: 1;
    gap: 1rem;
    max-width: 450px;
    background: #f8f9fa;

    .author-info {
      .ava {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 0.5rem;
      }
      .name {
        font-weight: bold;
      }
      .time-active {
        color: var(--grey-400);
      }
    }

    .author-contact-container {
      gap: 1rem;
      .author-phone,
      .author-chat {
        padding: 0.5rem 2rem;
        border-radius: 10px;
        width: 90%;
        color: var(--white);
        cursor: pointer;
        user-select: none;
        transition: 0.2s ease-out;
      }

      .author-phone,
      .author-chat {
        border: 2px solid var(--yellow-dark);
        background: var(--white);
        color: var(--black);
      }

      .author-phone:hover,
      .author-chat:hover {
        background: var(--yellow-dark);
        color: var(--white);
      }
    }

    .feedback-container {
      width: 90%;
      margin: 0 auto;

      .icon-container {
        margin: 0;
      }

      .feedback-btn {
        padding: 5px 10px;
        background: var(--yellow-dark);
        color: var(--white);
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
      }
    }

    .post-comment {
      h6 {
        font-size: 1.2rem;
        margin: 0.5rem;
      }

      .comment-list {
        width: 90%;
        margin: 0 auto;
        .comment-item {
          margin-top: 1rem;
          font-size: 0.9rem;

          .ava {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 0.5rem;
          }
          .comment-author {
            font-weight: bold;
          }
          .comment-time {
            color: var(--grey-400);
          }
          .rating {
            margin-left: auto;
          }
          .comment-content {
            margin-left: calc(50px + 0.5rem);
          }
        }
      }
    }
  }
`;

export default DetailPost;
