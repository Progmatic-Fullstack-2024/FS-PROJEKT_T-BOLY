import authService from "../services/auth-service.js";
import { registerValidationSchema } from "../validations/register.validation.js";

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
  const { email, password, username, passwordAgain } = req.body;
  try {
    await registerValidationSchema.validate({ email, password });
    const newUser = await authService.register({
      email,
      password,
      username,
      passwordAgain,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export default { register, login };
