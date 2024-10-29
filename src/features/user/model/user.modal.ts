import mongoose, { Schema, Document, ObjectId } from "mongoose";

// Interface representing a User document in MongoDB
export interface User extends Document {
  _id: ObjectId;
  clerkId: string;
  email: string;
  imageUrl: string;
  fullName: string;
  username : string;
}

// Define the User schema
const UserSchema = new Schema<User>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    imageUrl: { type: String, required: true },
    fullName: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

// Create and export the User model
const User = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default User;
