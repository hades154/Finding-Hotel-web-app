import React from "react";
import Wrapper from "../../assets/wrappers/Profile";
import userPosts from "../../utils/userPost";
import { NavLink } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { BriefPost } from "../../components";
import { useAppContext } from "../../context/appContext";

function Profile() {
  return (
    <Wrapper>
      <header className="profile-header">
        <div className="profile-background">
          <div className="profile-ava">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg  "
              alt="user-name"
            />
          </div>
        </div>
        <div className="profile-info">
          <p>Phùng Đình Dương</p>
          <p>Address: 113 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
          <p>Phone number: 0981669453</p>
          <p>
            Facebook:{" "}
            <a
              href="https://www.facebook.com/phungdinh.duong.5"
              target="_blank"
            >
              Đình Dương
            </a>{" "}
          </p>
          <p>University: Đại học Bách khoa Đà Nẵng</p>
          <p>Hobby: LoL, Đàm Nhiên, du lịch, ăn uống</p>
        </div>
        <nav className="profile-nav">
          <div className="nav-list nav-left">
            <NavLink to="/" className="nav-item">
              <span>10</span>
              <span>Posts</span>
            </NavLink>
            <NavLink to="/" className="nav-item">
              <span>5</span>
              <span>Follower</span>
            </NavLink>
            <NavLink to="/" className="nav-item">
              <span>1</span>
              <span>Following</span>
            </NavLink>
          </div>
          <div className="nav-list nav-right">
            <div>
              <button className="nav-item chat-btn">Chat</button>
            </div>
            <div>
              <button className="nav-item follow-btn">Follow</button>
            </div>
            <div>
              <button className="nav-item more-btn">
                <BsThreeDots />
              </button>
            </div>
          </div>
        </nav>
      </header>
      <section className="profile-content">
        <div className="content-header"></div>
        {/* <div className="content-main">
          {posts.map((post) => (
            <BriefPost key={post.id} post={post} />
          ))}
        </div> */}
      </section>
    </Wrapper>
  );
}

export default Profile;
