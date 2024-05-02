const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seed-helper");
const Campground = require("../models/campground");

mongoose.connect(process.env.MONGODB_CONNSTRING, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const AUTHOR_ID = "662f7301edc220145db8df25"; // Need to register a user first to get the ID
    const camp = new Campground({
      author: AUTHOR_ID,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nisi recusandae cumque numquam, vero voluptatem dolorum harum quasi explicabo, ut doloremque sit suscipit, repellendus ex quos qui reprehenderit accusamus nemo!",
      price,
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
