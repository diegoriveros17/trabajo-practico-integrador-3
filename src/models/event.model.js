import { model, Schema, Types } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },

    description: {
      type: String,
      require: false,
    },

    startDate: {
      type: Date,
      require: true,
    },

    endDate: {
      type: Date,
      require: true,
    },

    capacity: {
      type: Number,
      require: false,
    },

    price: {
      type: Number,
      require: false,
    },

    status: {
      type: String,
      enum: ["scheduled", "cancelled", "finished"],
      default: "scheduled",
    },

    location: {
      venue: {
        type: String,
        require: false,
      },
      address: {
        type: String,
        require: false,
      },
      city: {
        type: String,
        require: false,
      },
    },

    organizer: {
      type: Types.ObjectId,
      ref: "User",
      require: true,
    },

    categories: [
      {
        type: Types.ObjectId,
        ref: "Category",
        require: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const EventModel = model("Event", eventSchema);
