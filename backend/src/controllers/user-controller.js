import userService from "../services/user-service.js";
import imageService from "../services/image-service.js";

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
  } = req.body;

  try {
    const { updatedUser, token } = await userService.updateUser(id, {
      firstName,
      lastName,
      email,
      username,
      birthDate,
      adress,
      billingAdress,
      profilePictureUrl,
    });

    res.status(200).json({ token, updatedUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

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
    const profilePictureUrl = await imageService.createFile(file);
    const { token, updatedUser } = await userService.updateUser(id, {
      profilePictureUrl,
    });

    res.status(201).json({ token, updatedUser });
  } catch (error) {
    next(error);
  }
};

export default { updateUser, listUsernames, updateProfilePicture };
