import authService from "../services/auth-service.js";
import { registerValidationSchema } from "../validations/register.validation.js";

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

export default { register };
