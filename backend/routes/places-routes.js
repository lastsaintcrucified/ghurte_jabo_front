const express = require("express");
const router = express.Router();
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Sajek",
    address: "bandarban sajek chittagong",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipMTZWalB_R23PxKdMsYaxHW7uyvmS137XzSBGkU=w408-h271-k-no",
    description:
      "This is one of the best hilltracks in Bangladesh, that is being visited by tourists",
    co_ordinantes: [23.3819926, 92.2938229],
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    const error = new Error("Could not find the place with given id");
    error.code = 404;
    throw error;
  }
  res.json({ place });
});
router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_PLACES.find((u) => u.creator === userId);
  if (!user) {
    const error = new Error("Could not find the place with given user id");
    error.code = 404;
    return next(error);
  }
  res.json({ user });
});
module.exports = router;
