const httpError = require("../models/http-error");
const Place = require("../models/places.schema");
const getCoOrdForAddress = require("../utils/location");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

// let DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Sajek",
//     address: "bandarban sajek chittagong",
//     image:
//       "https://lh5.googleusercontent.com/p/AF1QipMTZWalB_R23PxKdMsYaxHW7uyvmS137XzSBGkU=w408-h271-k-no",
//     description:
//       "This is one of the best hilltracks in Bangladesh, that is being visited by tourists",
//     co_ordinantes: [23.3819926, 92.2938229],
//     creator: "u1",
//   },
// ];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new httpError(
      "Could find the place, something went wrong",
      500
    );
    return next(error);
  }
  if (!place) {
    const error = new httpError("Could not find the place with given id", 404);
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new httpError("Could not find any place for user", 404);
    return next(error);
  }
  if (!places || places.length == 0) {
    return next(Error("Could not find places with given user id", 404));
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
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
  } catch (error) {
    return next(error);
  }
  console.log(co_ordinates);
  const createdPlace = new Place({
    title,
    description,
    co_ordinantes: co_ordinates,
    address,
    image:
      "https://lh5.googleusercontent.com/p/AF1QipMTZWalB_R23PxKdMsYaxHW7uyvmS137XzSBGkU=w408-h271-k-no",
    creator,
  });

  console.log("n_co", createdPlace);
  try {
    await createdPlace.save();
  } catch (err) {
    const error = new httpError("Creating place failed!", 500);
    return next(error);
  }
  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const { title, description } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new httpError("Invalid data passed,please check the inputs", 422);
  }
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new httpError("Could not find place", 404);
    return next(error);
  }
  place.title = title;
  place.description = description;
  try {
    await place.save();
  } catch (err) {
    const error = new httpError("Something went wrong", 500);
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new httpError("Could not delete", 404);
    return next(error);
  }
  try {
    await place.remove();
  } catch (err) {
    const error = new httpError("Something went wrong", 500);
    return next(error);
  }
  res.status(200).json({ message: "Place deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
