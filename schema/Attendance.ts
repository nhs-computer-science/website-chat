import Mongoose from 'mongoose';

const Attendance = new Mongoose.Schema(
  {
    token: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
    },

    fall2021MeetingsAttended: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default Mongoose.model('Attendance', Attendance);
