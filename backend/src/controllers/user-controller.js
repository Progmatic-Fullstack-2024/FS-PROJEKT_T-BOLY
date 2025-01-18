import userService from "../services/user-service.js";

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

export default { updateUser, listUsernames };
