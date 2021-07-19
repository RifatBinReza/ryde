const { models } = require("../models");

const userRepository = () => {

  const create = async (data) => {
    //Create the address first and pass the _id to the user for saving the reference
    const address = await models.address.create(data.address)
    data.address = address._id;

    return models.user.create(data);
  };

  const update = async (data) => {
    //Create the address first and pass the _id to the user for saving the reference
    const user = await findById(data._id);
    const address = await models.address.findOne({_id: user.address});
    
    // Update address in the same request. Can be in a different request as well
    const updatedAddress = await models.address.findOneAndUpdate(
      { _id: address._id },
      data.address,
      {
        new: true,
      }
    );
    // Change the address from object to id
    data.address = updatedAddress._id;
    
    const updatedUser = await models.user.findOneAndUpdate(
      { _id: data._id },
      data,
      {
        new: true,
      }
    );

    return updatedUser;
  };

  const findByEmail = async (email) => {
    return models.user.findOne({
      email: email
    });
  };

  const findById = async (_id) => {
    return models.user.findOne({
      _id: _id
    });
  };

  const remove = async (_id) => {
    return models.user.deleteOne({
      _id: _id
    });
  };

  return {
    create,
    update,
    findByEmail,
    findById,
    remove,
  };
};

module.exports = userRepository();
