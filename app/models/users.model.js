/* eslint-disable object-property-newline */
module.exports = (mongoose) => {
  const usersSchema = new mongoose.Schema(
    {

      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true },
  );
  usersSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const users = mongoose.model('users', usersSchema);
  return users;
};
