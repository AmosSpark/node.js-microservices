const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "movie-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

// Connect to the Kafka broker
producer.connect();

async function sendMessageToBroker(movie) {
  // Send a message to the "movie-update" topic
  await producer.send({
    topic: "movie-update",
    messages: [
      {
        key: movie._id.toString(),
        value: JSON.stringify(movie),
      },
    ],
  });
}

// const sendMessageToBrooker = async (movie) => {
//   const run = async () => {
//     // Connect to the Kafka broker
//     await producer.connect();

//     // Send a message to the "movie-update" topic

//     await producer.send({
//       topic: "movie-update",
//       messages: [
//         {
//           key: movie._id.toString(),
//           value: JSON.stringify(movie),
//         },
//       ],
//     });
//   };

//   run().catch(console.error);
// };

// const run = async (id, movie) => {
//   // Connect to the Kafka broker
//   await producer.connect();
//   // Send a message to the "movie-update" topic
//   await producer.send({
//     topic: "movie-update",
//     messages: [
//       {
//         key: id,
//         value: JSON.stringify(movie),
//       },
//     ],
//   });
// };

// run().catch(console.error);

/*
// In producer.js

// Connect to the Kafka broker
producer.connect();

async function sendMessage(movie) {
  // Send a message to the "movie-update" topic
  await producer.send({
    topic: "movie-update",
    messages: [
      {
        key: movie._id.toString(),
        value: JSON.stringify(movie),
      },
    ],
  });
}
*/
module.exports = { sendMessageToBroker };
