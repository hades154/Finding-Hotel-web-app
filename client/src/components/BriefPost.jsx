import Wrapper from "../assets/wrappers/BriefPost";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";

function BriefPost({ post }) {
  let date = moment(post.date);
  date = date.format("MMM Do, YYYY");
  let navigate = useNavigate();
  let id = post._id;

  const clickPost = () => {
    navigate("/detail-post/" + id);
  };

  const infoContent = (
    <div className="info-content">
      <span className="price-content">{post.price} VND</span>
      <span className="area-content">
        {post.area} m<sup>2</sup>
      </span>
      <span className="position-content">{post.city.name}</span>
      {post.feature === "new" && (
        <span className="time-content">{format(post.date)}</span>
      )}
    </div>
  );

  const toProfile = () => {
    navigate("/profile/" + post.createdBy._id);
  };

  const authorContent = (
    <div className="author-content">
      <img src={post.createdBy.user_ava} alt={post.createdBy.username} />
      <span className="author-name" onClick={toProfile}>
        {post.createdBy.username}
      </span>
      <span className="author-phone">{post.createdBy.phone_number}</span>
      <span className="contact-content">Contact</span>
    </div>
  );

  return (
    <Wrapper>
      <div className="post">
        <div className="flex-row">
          <div className="post-image">
            <img src={post.image} alt={post.title} />
          </div>
          <div className="post-content">
            <div className="main-content" onClick={clickPost}>
              <h5>{post.title}</h5>
              {post.feature !== "new" && infoContent}
              {post.feature !== "new" && (
                <p className="description-content">{post.description}</p>
              )}
            </div>
            {post.feature !== "new" && authorContent}
          </div>
        </div>
        {post.feature === "new" && infoContent}
      </div>
    </Wrapper>
  );
}

export default BriefPost;
