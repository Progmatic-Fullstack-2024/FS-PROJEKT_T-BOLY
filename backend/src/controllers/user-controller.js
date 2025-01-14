import userService from "../services/user-service";

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
    const updatedUser = await userService.updateUser(id, {
      firstName,
      lastName,
      email,
      username,
      birthDate,
      adress,
      billingAdress,
      profilePictureUrl,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export default { updateUser };
