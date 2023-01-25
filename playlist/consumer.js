const { Kafka } = require("kafkajs");
const { default: mongoose } = require("mongoose");

const Playlist = require("./src/models/playlist");

const kafka = new Kafka({
  clientId: "playlist-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "playlist-update" });

// const run = async () => {
//   // Connect to the Kafka broker
//   await consumer.connect();
//   // Subscribe to the "movie-update" topic
//   await consumer.subscribe({ topic: "movie-update" });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log({
//         partition,
//         offset: message.offset,
//         value: message.value.toString(),
//       });
//     },
//   });
// };

// run().catch(console.error);

// const listenToMessageFromBrokerProducer = (Playlist) => {
// const run = async () => {
//   // Connect to the Kafka broker
//   await consumer.connect();
//   // Subscribe to the "movie-update" topic
//   await consumer.subscribe({ topic: "movie-update" });

//   // Listen for new messages
//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       const movie = JSON.parse(message.value.toString());

//       // Find the playlist that contains the movie
//       const playlist = await Playlist.findOne({ "list.movie_id": movie._id });

//       if (!playlist) throw new Error("Playlist is not found");

//       // Update the movie in the list
//       await Playlist.findByIdAndUpdate(playlist.id, {
//         "list.genre": movie.genre,
//         "list.star": movie.star,
//       });
//     },
//   });
// };

// run().catch(console.error);
// };

// module.exports = { listenToMessageFromBrokerProducer };

async function listen() {
  // Connect to the Kafka broker
  await consumer.connect();

  // Subscribe to the "movie-update" topic
  await consumer.subscribe({ topic: "movie-update" });

  // Listen for new messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const movie = JSON.parse(message.value.toString());

      // Find the playlist that contains the movie
      const playlist = await Playlist.findOne({ "list.movie_id": movie._id });

      // Update the movie in the list

      if (!playlist) {
        return console.log("playlist not found");
      }

      // Update the playlist
      await Playlist.findByIdAndUpdate(
        playlist._id,
        {
          list: {
            movie_id: movie._id,
            genre: movie.genre,
            star: movie.star,
          },
        },
        { new: true }
      );
    },
  });
}

module.exports = {
  listen,
};
