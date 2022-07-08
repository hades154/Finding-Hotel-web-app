import mongoose from "mongoose";

const MotelSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  city: {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
  },
  ward: {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
  },
  district: {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
  },
  address: {
    type: String,
  },
  phone_number: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  deposit: {
    type: Number,
  },
  area: {
    type: Number,
  },
  renter: {
    type: String,
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  feature: {
    type: String,
    default: "hot",
  },
  list_img: [
    {
      image: {
        type: String,
      },
    },
  ],
  review: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
      },
      text: {
        type: String,
      },
      username: {
        type: String,
      },
      avatar: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default mongoose.model("Motel", MotelSchema);
