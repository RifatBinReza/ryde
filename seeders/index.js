const { models } = require("../models");

/**
 * Connect to the database instance
 */
const seedDB = async () => {
  try {
    const users = [
      {
        name: "Rifat",
        username: "rifat",
        password: "Test1234",
        email: "rifatbinreza@gmail.com",
        dob: "1990-10-05T14:48:00.000Z",
        address: {
          name: "Home",
          line1: "03-04",
          line2: "Serangoon Road",
          position: {
            coordinates: [1.334743, 103.859303],
          },
        },
      },
      {
        name: "Jim",
        username: "jim",
        password: "Test1234",
        email: "jim@office.com",
        dob: "1991-11-08T14:48:00.000Z",
        address: {
          name: "Home",
          line1: "02-08",
          line2: "Paya Laber",
          position: {
            coordinates: [1.32213, 103.882392],
          },
        },
      },
      {
        name: "Pam",
        username: "pam",
        password: "Test1234",
        email: "pam@office.com",
        dob: "1989-06-05T14:48:00.000Z",
        address: {
          name: "Home",
          line1: "02-06",
          line2: "Whampoa",
          position: {
            coordinates: [1.321324, 103.854351],
          },
        },
      },
      {
        name: "Kevin",
        username: "kevin",
        password: "Test1234",
        email: "kevin@office.com",
        dob: "1985-11-05T14:48:00.000Z",
        address: {
          name: "Home",
          line1: "01-04",
          line2: "Bedok",
          position: {
            coordinates: [1.337876, 103.938495],
          },
        },
      },
    ];
    
    users.forEach(async (user) => {
      const existingUser = await models.user.findOne({email: user.email});
      if (!existingUser) {
        const address = await models.address.create(user.address);
        user.address = address._id;
  
        await models.user.create(user);
      }
    })
  } catch (err) {
    console.error(`Seeding Error: ${err.message}`);
    throw err;
  }
};

module.exports = { seedDB };
