import User from "../models/User.js";

const getUserById = async (req, res) => {
  const userId = req.query.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const changeProfile = async (req, res) => {
  try {
    const updateProfile = await User.findOneAndUpdate(
      { _id: req.user.userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ updateProfile });
  } catch (error) {
    res.status(500).json(err);
  }
};

const follow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};

const checkFollow = async (req, res) => {
  const currentUser = await User.findById(req.params.currentUserId);
  try {
    const isFollow = currentUser.followings.find((e) => e === req.params.id);
    if (isFollow) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const create_user_ava = async (req, res) => {
  const { id: userId } = req.params;

  const currentUser = await User.findOne({ _id: userId });
  currentUser.user_ava = "http://127.0.0.1:5000/images/" + req.file.filename;
  await User.findOneAndUpdate({ _id: userId }, currentUser, { new: true });
  res.status(200).json(currentUser.user_ava);
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findOne({ _id: userId });
  await user.remove();
  res.status(200).json({ msg: "Success! User removed" });
};

export {
  getUserById,
  changeProfile,
  follow,
  checkFollow,
  create_user_ava,
  deleteUser,
};
