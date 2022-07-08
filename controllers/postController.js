import { StatusCodes } from "http-status-codes";
import Motel from "../models/Motel.js";
import User from "../models/User.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createPost = async (req, res) => {
  const { title, category, city, district, ward, phone_number, price } =
    req.body;

  if (
    !title ||
    !category ||
    !city ||
    !ward ||
    !district ||
    !phone_number ||
    !price
  ) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;

  try {
    let post = await Motel.create(req.body);
    res.status(StatusCodes.OK).json({ post });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("SOME THING WENT WRONG");
  }
};

const create_post_image = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Motel.findOne({ _id: postId });
  post.image = "http://127.0.0.1:5000/images/" + req.file.filename;
  await Motel.findOneAndUpdate({ _id: postId }, post, { new: true });
  res.status(StatusCodes.OK).json("OK");
};
const deletePost = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Motel.findOne({ _id: postId });

  if (!post) {
    throw new NotFoundError(`No post with id :${postId}`);
  }

  checkPermissions(req.user, post.createdBy);

  await post.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};
const getAllPosts = async (req, res) => {
  try {
    const posts = await Motel.find().populate("createdBy").sort({ date: -1 });
    res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Motel.findById(req.params.id).populate("createdBy");
    res.status(StatusCodes.OK).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const { title, category, city, district, ward, phone_number, price } =
    req.body;

  if (
    !title ||
    !category ||
    !city ||
    !ward ||
    !district ||
    !phone_number ||
    !price
  ) {
    throw new BadRequestError("Please provide all values");
  }

  const post = await Motel.findOne({ _id: postId });
  if (!post) {
    throw new NotFoundError(`No post with id :${postId}`);
  }

  checkPermissions(req.user, post.createdBy);
  const updatedPost = await Motel.findOneAndUpdate({ _id: postId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedPost });
};

const findPost = async (req, res) => {
  const { city, district, ward, price, area, category } = req.query;
  const queryObject = {};
  if (city && city.split(",")[1] !== "All") {
    queryObject.city = { id: city.split(",")[0], name: city.split(",")[1] };
  }
  if (district && district.split(",")[1] !== "All") {
    queryObject.district = { id: district };
  }
  if (ward && ward.split(",")[1] !== "All") {
    queryObject.ward = { id: ward };
  }
  if (price) {
    const request = price.split(",");
    if (request[0] < request[1]) {
      queryObject.price = { $gte: request[0], $lte: request[1] };
    } else {
      queryObject.price = { $gte: request[1], $lte: request[0] };
    }
  }
  if (area) {
    const request = area.split(",");
    if (request[0] < request[1]) {
      queryObject.area = { $gte: request[0], $lte: request[1] };
    } else {
      queryObject.area = { $gte: request[1], $lte: request[0] };
    }
  }
  if (category) {
    queryObject.category = category;
  }
  let result = await Motel.find(queryObject).populate("createdBy");

  res.status(200).json(result);
};

const getReview = async (req, res) => {
  const post = await Motel.findById(req.params.id);
  res.json(post.review);
};

const reviewPost = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const post = await Motel.findById(req.params.id);
  const newReview = {
    text: req.body.text,
    username: user.username,
    avatar: user.user_ava,
    user: req.user.userId,
    rating: req.body.rating,
  };
  post.review.unshift(newReview);

  await post.save();

  res.json(post.review);
};

const deleteReview = async (req, res) => {
  try {
    const post = await Motel.findById(req.params.id);
    //Pull out comment

    let review;
    post.review.forEach((element) => {
      if (element._id.toString() === req.params.review_id) {
        review = element;
      }
    });

    // Make sure comment exists
    if (!review) {
      return res.status(404).json({ msg: "Review does not exist" });
    }

    // Check user
    if (review.user.toString() !== req.user.userId) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = post.review
      .map((review) => review._id.toString())
      .indexOf(req.params.review_id);

    post.review.splice(removeIndex, 1);

    post.save();

    res.json(post.review);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
};

const addMotelImage = async (req, res) => {
  try {
    const { id: postId } = req.params;

    const post = await Motel.findOne({ _id: postId });
    const image = "http://127.0.0.1:5000/images/" + req.file.filename;

    const newImage = {
      image: image,
    };

    post.list_img.unshift(newImage);
    post.save();
    res.status(StatusCodes.OK).json(post.list_img);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
};

const deleteMotelImage = async (req, res) => {
  try {
    Motel.updateOne(
      { _id: req.params.id },
      {
        $set: { list_img: [] },
      }
    );
    res.status(200).json("OK");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  create_post_image,
  findPost,
  reviewPost,
  deleteReview,
  getPostById,
  addMotelImage,
  deleteMotelImage,
  getReview,
};
