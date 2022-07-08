import React from "react";
import Wrapper from "../../assets/wrappers/ProfileTest";
import UserBriefPost from "../../components/UserBriefPost";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineDataSaverOff } from "react-icons/md";
import { useAppContext } from "../../context/appContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { MdEdit } from "react-icons/md";

function ProfileTest() {
  const [isEditForm, setIsEditForm] = useState(false);
  const [follow, setFollow] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  let { id } = useParams();
  let navigate = useNavigate();
  const {
    posts,
    getPosts,
    user,
    username,
    firstName,
    lastName,
    phone_number,
    address,
    user_ava,
    getProfileById,
    handleChange,
    updateUserProfile,
    updateUserAva,
  } = useAppContext();

  useEffect(() => {
    getPosts();
    getProfileById(id);
    const checkFollow = async () => {
      const res = await axios("/api/users/" + user._id + "/" + id);
      setFollow(res);
    };
    checkFollow();
  }, [id, user_ava]);

  const handleProfileInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  function getPostByUserId() {
    return posts.filter((post) => post.createdBy._id === id);
  }
  const postByUserId = getPostByUserId();

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditForm(true);
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
    setOpen(!open);
  };

  const updateImage = (e) => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    updateUserAva(formData);
    toggleModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditForm(false);
    updateUserProfile();
  };

  const handleChat = async (e) => {
    e.preventDefault();
    let res = await axios("/api/conversation/find/" + user._id + "/" + id);
    if (res.data === null) {
      const data = {
        senderId: user._id,
        receiverId: id,
      };
      res = await axios.post("/api/conversation/", data);
    }
    navigate("../chat", { state: { conversationId: res.data._id } });
  };

  const handleFollow = async (e) => {
    e.preventDefault();
    await axios("/api/users/" + id + "/follow", { userId: user._id });
    setFollow(!follow);
  };

  return (
    <Wrapper>
      <div className="container--left">
        <div className="user__info">
          <div className="ava">
            <img src={user_ava} alt="user-name" />
            {user._id === id && (
              <>
                <div className="input-ava">
                  <label htmlFor="input-ava">
                    <MdEdit />
                    <span>Edit</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*,.jpg,.png"
                    onChange={handleFileChange}
                    id="input-ava"
                  />
                </div>
              </>
            )}
            {selectedImage && (
              <Modal
                isOpen={open}
                toggle={toggleModal}
                className="update-ava-modal"
              >
                <ModalBody className="update-ava-modal__container">
                  <div className="update-ava-modal__ask">
                    Update this image?
                  </div>
                  <div className="update-ava-modal__img">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="user-ava"
                    />
                  </div>
                  <div className="update-ava-modal__btns">
                    <button
                      onClick={updateImage}
                      className="update-ava-modal__btn update-ava-modal__btn--primary"
                    >
                      Yes
                    </button>
                    <button
                      onClick={toggleModal}
                      className="update-ava-modal__btn update-ava-modal__btn--grey"
                    >
                      Cancel
                    </button>
                  </div>
                </ModalBody>
              </Modal>
            )}
          </div>
          <div className="name">{username}</div>
          <div className="intro">
            I have a lot of clean and quiet rooms for you guys, contact me to
            know more.
          </div>
          {id !== user._id && (
            <div className="action">
              {follow ? (
                <button className="btn--follow" onClick={handleFollow}>
                  Followed
                </button>
              ) : (
                <button className="btn--follow" onClick={handleFollow}>
                  Follow
                </button>
              )}

              <button className="btn--message" onClick={handleChat}>
                Message
              </button>
            </div>
          )}
        </div>
        <div className="user__social">
          <ul>
            <li>
              <span>Website</span>
              <span>Website id</span>
            </li>
            <li>
              <span>Facebook</span>
              <span>Facebook id</span>
            </li>
            <li>
              <span>Zalo</span>
              <span>Zalo id</span>
            </li>
          </ul>
        </div>
        <div className="user__view-more">
          <a href="/">View more information</a>
        </div>
      </div>
      <div className="container--right">
        <div className="user__form">
          <form>
            <div className="form-input-group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                className={isEditForm ? "input-form" : "input-text"}
                disabled={!isEditForm}
                onChange={handleProfileInput}
              />
            </div>
            <div className="form-input-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                className={isEditForm ? "input-form" : "input-text"}
                disabled={!isEditForm}
                onChange={handleProfileInput}
              />
            </div>
            <div className="form-input-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                className={isEditForm ? "input-form" : "input-text"}
                disabled={!isEditForm}
                onChange={handleProfileInput}
              />
            </div>
            <div className="form-input-group">
              <label htmlFor="phone_number">Phone</label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                value={phone_number}
                className={isEditForm ? "input-form" : "input-text"}
                disabled={!isEditForm}
                onChange={handleProfileInput}
              />
            </div>
            <div className="form-input-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={address}
                className={isEditForm ? "input-form" : "input-text"}
                disabled={!isEditForm}
                onChange={handleProfileInput}
              />
            </div>
            {id === user._id && (
              <div className="action-form">
                {!isEditForm && (
                  <button onClick={handleEdit} className="edit-btn">
                    <AiFillEdit className="icon" />
                    Edit
                  </button>
                )}

                {isEditForm && (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="submit-btn"
                  >
                    <MdOutlineDataSaverOff />
                    Save changes
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
        <div className="user__post">
          {postByUserId.map((post) => (
            <React.Fragment key={post._id}>
              <div className="post__container">
                <UserBriefPost post={post} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export default ProfileTest;
