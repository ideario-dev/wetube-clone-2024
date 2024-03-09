import Video from "../models/Video.js";

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
  const videos = await Video.find({});
  return res.render("home", { videos });
};

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: `${video.title}` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing: ${video.title}` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/video/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  let { title, description, hashtags } = req.body;
  await Video.create({
    title: title,
    description: description,
    createdAt: new Date(),
    hashtags: hashtags.split(",").map((item) => `#${item}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  return res.redirect("/");
};
