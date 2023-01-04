/* eslint-disable object-property-newline */
module.exports = (mongoose) => {
  const cartsSchema = new mongoose.Schema(
    {

      userId: { type: String, required: true, unique: true },
      products: [

        {
          productId: {
            type: String,
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
    },
    { timestamps: true },
  );
  cartsSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const carts = mongoose.model('carts', cartsSchema);
  return carts;
};
