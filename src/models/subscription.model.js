import mongoose, { Schema, model, models } from "mongoose";

const subscriptionShema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Subscription =
  models.Subscription || model("Subscription", subscriptionShema);

export default Subscription;
