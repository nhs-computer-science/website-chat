import Mongoose from 'mongoose';

const Message = new Mongoose.Schema(
  {
    email: {
      type: String,
    },

    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    message: {
      type: String,
    },
  },
  { timestamps: true }
);

export default Mongoose.model('messages', Message);
