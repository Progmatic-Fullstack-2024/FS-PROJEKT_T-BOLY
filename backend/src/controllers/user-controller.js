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
      next(error);
    }
  };

export default { updateUser };
