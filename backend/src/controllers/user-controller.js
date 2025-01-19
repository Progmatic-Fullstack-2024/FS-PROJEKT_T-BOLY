import userService from "../services/user-services";

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
  const { filter, sortBy, order, page = 1, limit = 10 } = req.query;

  try {
    const result = await userService.getAllUsers(
      JSON.parse(filter || "{}"),
      sortBy,
      order,
      parseInt(page, 10),
      parseInt(limit, 10),
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default { updateUser, deleteUser, getUserById, getAllUsers };
