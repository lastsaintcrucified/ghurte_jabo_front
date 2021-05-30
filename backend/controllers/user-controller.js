const { v4: uuidv4 } = require("uuid");

const { validationResult } = require("express-validator");
const httpError = require("../models/http-error");

const DUMMY_USER = [
  {
    id: "u1",
    name: "Mark Rufflao",
    image:
      "https://images.unsplash.com/photo-1502447533750-9860c1269ae3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    places: 3,
  },
  {
    id: "u2",
    name: "Mark Rufflao",
    image:
      "https://images.unsplash.com/photo-1502447533750-9860c1269ae3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    places: 3,
  },
  {
    id: "u3",
    name: "Mark Rufflao",
    image:
      "https://images.unsplash.com/photo-1502447533750-9860c1269ae3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    places: 3,
  },
  {
    id: "u4",
    name: "Mark Rufflao",
    image:
      "https://images.unsplash.com/photo-1502447533750-9860c1269ae3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    places: 3,
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USER });
};

const signUp = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new httpError("Invalid data passed,please check the inputs", 422);
  }
  const hasUser = DUMMY_USER.find((u) => u.email === email);
  if (hasUser) {
    throw new httpError("Could not create user, email already exists", 422);
  }
  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  DUMMY_USER.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new httpError("Invalid data passed,please check the inputs", 422);
  }
  const identifiedUser = DUMMY_USER.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new httpError(
      "Couldn't identify user, credintials seems to be wrong",
      401
    );
  }
  res.json({ message: "Logged In!!" });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
