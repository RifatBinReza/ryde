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

  const follow = async (userId, followUserId) => {
    const addToFollowing = {
      $addToSet: { following: followUserId },
    };

    await models.user.findOneAndUpdate({ _id: userId }, addToFollowing);

    const addToFollower = {
      $addToSet: { followers: userId },
    };

    await models.user.findOneAndUpdate({ _id: followUserId }, addToFollower);

    return [];
  };

  const nearby = async (userId) => {
    const user = await findById(userId);

    // return empty array if there's no following users
    if(user.following.length < 1) {
      return [];
    }

    const userAddress = await models.address.findOne({_id: user.address});

    const lat = userAddress.position.coordinates[0];
    const lng = userAddress.position.coordinates[1];
    const maxDistanceInMeters = 5000;

    // Here we can user haversine equation in the following users coordinations to find the nearby users within the max distance


    return [];
  };

  return {
    create,
    update,
    findByEmail,
    findById,
    remove,
    follow,
    nearby
  };
};

module.exports = userRepository();
