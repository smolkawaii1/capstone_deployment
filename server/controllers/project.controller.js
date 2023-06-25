import Project from "../mongodb/models/project.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const getAllProjects = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = "",
    sectorType = "",
  } = req.query;
  const query = {};

  if (sectorType !== "") {
    query.sectorType = sectorType;
  }
  if (title_like) {
    query.title = { $regex: title_like, $options: "i" };
  }
  try {
    const count = await Project.countDocuments({ query });

    const projects = await Project.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProjectDetail = async (req, res) => {
  const { id } = req.params;
  const projectExists = await Project.findOne({ _id: id });

  if (projectExists) {
    res.status(200).json(projectExists);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
};

const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      sectorType,
      fund,
      source,
      duration,
      proponent,
      status,
      objective,
      activity,
      expectOutput,
      expectOutputDuration,
      college,
      intext,
      file,
    } = req.body;

    const fileUrl = await cloudinary.uploader.upload(file); // Retrieve the file from req.file

    const project = new Project({
      title,
      description,
      sectorType,
      fund,
      source,
      duration,
      proponent,
      status,
      objective,
      activity,
      expectOutput,
      expectOutputDuration,
      college,
      file: fileUrl.url.name, // Assign the file path to the 'file' field
      intext,
    });

    await project.save();

    res.status(200).json({ message: "Project/Research added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      sectorType,
      fund,
      source,
      duration,
      proponent,
      status,
      objective,
      activity,
      expectOutput,
      expectOutputDuration,
      college,
      intext,
      file,
    } = req.body;

    await Project.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        sectorType,
        fund,
        source,
        duration,
        proponent,
        status,
        objective,
        activity,
        expectOutput,
        expectOutputDuration,
        college,
        intext,
        file,
      }
    );
    res.status(200).json({ message: "Project/Research successfully updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const projectToDelete = await Project.findById(id);
    if (!projectToDelete) throw new Error("Project/Research not found");

    await projectToDelete.deleteOne();

    res.status(200).json({ message: "Project/Research successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    const totalInvestments = projects.reduce((sum, project) => {
      return sum + project.investment;
    }, 0);

    const totalProjects = projects.length;
    const completedProjects = projects.filter(
      (project) => project.status === "Completed"
    ).length;

    const data = {
      totalInvestments,
      totalProjects,
      completedProjects,
    };

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getAllProjects,
  getAllProjectDetail,
  createProject,
  updateProject,
  deleteProject,
  getProjects,
};
