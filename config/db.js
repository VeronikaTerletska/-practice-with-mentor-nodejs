const mongoose = require("mongoose");
// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

//Node.js Unhandled Rejection Error - хук у Ноді для використання try-catch

async function connectDB() {
  try {
    const DB = await mongoose.connect(process.env.DB_URL);

    console.log(
      `MongoDB is connected on host ${DB.connection.host}, on port ${DB.connection.port}, name is ${DB.connection.name}`
        .yellow.bold.italic
    );
  } catch (error) {
    console.log(error.message.red.bold.italic);
    process.exit(1);
  }
}

module.exports = connectDB;
