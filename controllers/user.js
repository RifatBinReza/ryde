const userService = require("../services/user");
const response = require("../helpers/response");

const userController = () => {
  const signup = async (req, res) => {
    const data = req.body;

    try {
      const userData = await userService.create(data);
      return response.jsonSuccess(
        res,
        userData,
        "Successfully signed up user.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const userData = await userService.login(email, password);

      return response.jsonSuccess(
        res,
        userData,
        "Successfully logged in user.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const get = async (req, res) => {
    const { _id } = req.params.id;
    try {
      const userData = await userService.getById(_id);

      return response.jsonSuccess(
        res,
        userData,
        "Successfully fetched user.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const update = async (req, res) => {
    const user = req.body;
    // Set the user id from the parameter
    user._id = req.params.id;
    try {
      const userData = await userService.update(user);

      return response.jsonSuccess(
        res,
        userData,
        "Successfully updated user.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const remove = async (req, res) => {
    const _id = req.params.id;
    try {
      // Let's pretend the user can only delete their own account.
      if (_id !== req.userId) {
        throw new Error('Not authorize to make this request.')
      }
      const userData = await userService.remove(_id);

      return response.jsonSuccess(
        res,
        userData,
        "Successfully deleted user.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  return {
    signup,
    login,
    get,
    update,
    remove
  };
};

module.exports = userController();
