import userService from "../services/user-service.js";
import { createFile } from "../services/file.service.js";

const listUsernames = async (req, res, next) => {
  const userId = req?.user.id || "";
  try {
    const usernames = await userService.listUsernames(userId);
    res.status(200).json(usernames);
  } catch (error) {
    next(error);
  }
};

const updateProfilePicture = async (req, res, next) => {
  const file = req.file || null;
  const { id } = req.user;
  try {
    const profilePictureUrl = await createFile(file);
    const { token, updatedUser } = await userService.updateProfilePicture(id, {
      profilePictureUrl,
    });

    res.status(201).json({ token, updatedUser });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { firstName, lastName, email, username, role } = req.body;

  try {
    const newUser = await userService.createUser({
      firstName,
      lastName,
      email,
      username,
      role,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    username,
    birthDate,
    adress,
    billingAdress,
    profilePictureUrl,
    role,
  } = req.body;

  try {
    const { updatedUser, token } = await userService.updateUser(
      id,
      {
        firstName,
        lastName,
        email,
        username,
        birthDate,
        adress,
        billingAdress,
        profilePictureUrl,
        role,
      },
      req.user.id,
      req.user.role,
    );

    res.status(200).json({ token, updatedUser });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUser(id, req.user.id, req.user.role);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  const {
    sorting,
    order,
    page = 1,
    limit = 9,
    filterByRole,
    filterByIsActive,
  } = req.query;

  try {
    const { users, totalUsers, totalPages } = await userService.getAllUsers(
      sorting,
      order,
      Number(page),
      Number(limit),
      filterByRole,
      filterByIsActive !== "false",
    );

    res.status(200).json({ users, totalUsers, totalPages });
  } catch (error) {
    next(error);
  }
};

export default {
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  createUser,
  listUsernames,
  updateProfilePicture,
};
