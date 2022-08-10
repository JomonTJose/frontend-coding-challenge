import mongoose from "mongoose";

const membersSchema = new mongoose.Schema({
  crewId: Number,
  id: Number,
  image: String,
  name: String,
  userId: Number,
})

const MembersModel = mongoose.model("Members", membersSchema);
export default MembersModel;
