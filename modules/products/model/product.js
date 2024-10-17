const { model, Schema } = require("mongoose");
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 20,
    },
    sizes: [{ type: Number, required: true }],
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number },
    colors: [{ type: String, required: true, trim: true }],
    description: { type: String, trim: true },
    images: [{ type: String, required: true, trim: true }],
    manufacturer: { type: String, trim: true },
    materialComposition: { type: String, trim: true },
    discountPercentage: { type: Number },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
    deletedAt: { type: Date },
    changedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Products = model("Product", productSchema);
module.exports = Products;
