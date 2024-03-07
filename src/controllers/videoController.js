const fakeUser = {
  userName: "Nicolas",
  loginIn: false,
};

export const trending = (req, res) => {
  const videos = [
    {
      title: "First Video",
      rating: 5,
      comments: 2,
      createdAt: "2 month ago",
      views: 34,
      id: 1,
    },
    {
      title: "Second Video",
      rating: 5,
      comments: 2,
      createdAt: "2 month ago",
      views: 34,
      id: 1,
    },
    {
      title: "Third Video",
      rating: 5,
      comments: 2,
      createdAt: "2 month ago",
      views: 34,
      id: 1,
    },
  ];
  res.render("home", { pageTitle: "home", fakeUser, videos });
};

export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("search!");
export const upload = (req, res) => res.send("upload");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  res.send("Delete Video");
};
