import userService from "../services/user-services.js";

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
      req.user.role
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
    pageNumber = 1,
    limitNumber = 10,
    filterByRole,
    filterByIsActive,
  } = req.query;

  try {
    const { users, totalUsers, totalPages } = await userService.getAllUsers(
      sorting,
      order,
      Number(pageNumber),
      Number(limitNumber),
      filterByRole,
      filterByIsActive !== "false"
    );

    res.status(200).json({ users, totalUsers, totalPages });
  } catch (error) {
    next(error);
  }
};

export default { updateUser, deleteUser, getUserById, getAllUsers };
