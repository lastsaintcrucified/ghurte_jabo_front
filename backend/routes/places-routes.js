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
    return res
      .status(404)
      .json({ message: "Could not find the place with given id" });
  }
  res.json({ place });
});
router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_PLACES.find((u) => u.creator === userId);
  if (!user) {
    return res
      .status(404)
      .json({ message: "Could not find the user with given id" });
  }
  res.json({ user });
});
module.exports = router;
