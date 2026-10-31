import { model, Schema, Types } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    capacity: {
      type: Number,
      require: false,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "La capacidad debe ser un número entero",
      },
    },

    price: {
      type: Number,
      min: 0,
      default: 0,
    },

    status: {
      type: String,
      enum: ["scheduled", "cancelled", "finished"],
      default: "scheduled",
    },

    location: {
      venue: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
      },
      address: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 150,
      },
      city: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
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
