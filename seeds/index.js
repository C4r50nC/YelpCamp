if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

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
    // Need to register a user first to get the ID
    const AUTHOR_ID = "662f7301edc220145db8df25";
    const camp = new Campground({
      author: AUTHOR_ID,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nisi recusandae cumque numquam, vero voluptatem dolorum harum quasi explicabo, ut doloremque sit suscipit, repellendus ex quos qui reprehenderit accusamus nemo!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      // Hardcoded image URLs from Cloudinary
      images: [
        {
          url: "https://res.cloudinary.com/dkfwmedqj/image/upload/v1714874248/yelp-camp/lxqbgd9xzidyekutwdcm.jpg",
          filename: "yelp-camp/lxqbgd9xzidyekutwdcm",
        },
        {
          url: "https://res.cloudinary.com/dkfwmedqj/image/upload/v1714874249/yelp-camp/u1ajyiadzn4whzrrjgve.jpg",
          filename: "yelp-camp/u1ajyiadzn4whzrrjgve",
        },
      ],
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
