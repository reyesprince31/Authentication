import mongoose from "mongoose";
// import encrypt from "mongoose-encryption";

import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;

mongoose.connect(process.env.MONGO_URI);

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// UserSchema.plugin(encrypt, {
//   secret: SECRET,
//   encryptedFields: ["password"],
// });

const User = mongoose.model("User", UserSchema);

export { User };
