/* eslint-disable object-property-newline */
module.exports = (mongoose) => {
  const productsSchema = new mongoose.Schema(
    {

      title: { type: String, required: true, unique: true },
      desc: { type: String, required: true },
      img: { type: String, required: true },
      categories: { type: Array },
      size: { type: String },
      color: { type: String },
      price: { type: Number, required: true },
    },
    { timestamps: true },
  );
  productsSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const products = mongoose.model('products', productsSchema);
  return products;
};
