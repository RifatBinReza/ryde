const { models } = require("../models");

const addressRepository = () => {
    const remove = (_id) => {
      return models.address.deleteOne({
        _id: _id,
      });
    };

  return {
    remove,
  };
};

module.exports = addressRepository();
