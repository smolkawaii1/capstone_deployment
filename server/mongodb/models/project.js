import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  fund: { type: Number, required: true },
  source: { type: String, required: true },
  sectorType: { type: String, required: true },
  proponent: { type: String, required: true },
  status: { type: String, required: true },
  duration: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  objective: { type: String, required: true },
  activity: { type: String, required: true },
  expectOutput: { type: String, required: true },
  expectOutputDuration: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  college: { type: String, required: true },
  file: {
    name: { type: String, required: false },
    url: { type: String, required: false },
  }, // Add the file property to store the uploaded file
  intext: { type: String, required: true },
});

const projectModel = mongoose.model("Project", ProjectSchema);

export default projectModel;
