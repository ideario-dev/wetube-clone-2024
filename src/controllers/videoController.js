import Video from "../models/video.js";

/*
export const home = (req, res) => {
  Video.find({}, (error, videos) => {
    if (error) {
      return res.render("error-page");
    } else {
      return res.render("home", videos);
    }
  });
  console.log("finished");
};
*/

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home!", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  } else {
    return res.render("watch", { pageTitle: video.title, video: video });
  }
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  } else {
    return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
  }
};

export const postEdit = async (req, res) => {
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  } else {
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/video/${id}`);
  }
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  let { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags), // formatHashtags는 Video라는 클래스의 정적 매소드다
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: { $regex: new RegExp(`${keyword}`, "i") },
    });
    console.log(videos);
  }
  return res.render("search", { pageTitle: "Search", videos });
};
