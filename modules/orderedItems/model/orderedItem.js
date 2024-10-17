const { model, Schema } = require("mongoose");
const orderedItemSchema = new Schema(
  {
    orderedBy: { type: Schema.Types.ObjectId, ref: "User" },
    itemName: { type: Schema.Types.ObjectId, ref: "Product" },
    totalAmount: { type: Number },
    canceled: { type: Boolean },
  },
  { timestamps: true }
);

const orderedItem = model("OrderedItemSchema", orderedItemSchema);
module.exports = orderedItem;
