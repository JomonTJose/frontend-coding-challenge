import mongoose from "mongoose";

const absenceSchema = new mongoose.Schema({
  admitterId: Number,
  admitterNote: String,
  confirmedAt: Date,
  createdAt: Date,
  crewId: Number,
  endDate: Date,
  id: Number,
  memberNote: String,
  rejectedAt: String,
  startDate: String,
  type: String,
  userId: Number,
});
const Absences = mongoose.model("absences", absenceSchema);
export default Absences;
