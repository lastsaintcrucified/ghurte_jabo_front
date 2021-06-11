const httpError = require("../models/http-error");
const Place = require("../models/places.schema");
const getCoOrdForAddress = require("../utils/location");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

let DUMMY_PLACES = [
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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    throw new httpError("Could not find the place with given id", 404);
  }
  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_PLACES.filter((u) => u.creator === userId);
  if (!places || plaaces.length == 0) {
    return next(Error("Could not find places with given user id", 404));
  }
  res.json({ places });
};

const createPlace = async (req, res, next) => {
  const { title, description, address, creator } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    next(new httpError("Invalid data passed,please check the inputs", 422));
  }
  let co_ordinates;
  try {
    co_ordinates = await getCoOrdForAddress(address);
    console.log(co_ordinates);
  } catch (error) {
    return next(error);
  }
  const createdPlace = new Place({
    title,
    description,
    co_ordinates,
    address,
    image:
      "https://lh5.googleusercontent.com/p/AF1QipMTZWalB_R23PxKdMsYaxHW7uyvmS137XzSBGkU=w408-h271-k-no",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new httpError("Creating place failed!", 500);
    return next(error);
  }
  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new httpError("Invalid data passed,please check the inputs", 422);
  }
  const placeId = req.params.pid;
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.filter((p) => p.id !== placeId)) {
    throw new httpError("Could not find the place with given id", 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Place deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
