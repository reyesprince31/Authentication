import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
// import encrypt from "mongoose-encryption";

import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;

mongoose.connect(process.env.MONGO_URI);

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

UserSchema.plugin(passportLocalMongoose);
// UserSchema.plugin(encrypt, {
//   secret: SECRET,
//   encryptedFields: ["password"],
// });

const User = mongoose.model("User", UserSchema);

export { User };
