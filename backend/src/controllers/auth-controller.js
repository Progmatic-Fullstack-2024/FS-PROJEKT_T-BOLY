import authService from "../services/auth-service.js";
import registerValidationSchema from "../validations/register.validation.js";

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login({ email, password });
    res.json(token);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  const { email, password, username, lastName, firstName } = req.body;
  try {
    await registerValidationSchema.validate({ email, password });
    const newUser = await authService.register({
      email,
      password,
      username,
      lastName,
      firstName,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const passwordChange = async (req, res, next) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const updatedUser = await authService.passwordUpdate(
      id,
      oldPassword,
      newPassword,
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export default { register, login, passwordChange };
