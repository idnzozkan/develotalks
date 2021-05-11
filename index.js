const User = require("./user");
const Tags = require("./enums/Tags");
const Interests = require("./enums/Interests");
const Languages = require("./enums/Languages");

const colors = require("colors");

const db = require("./database");

const dennis = new User(
  1,
  "Deniz",
  "dennis",
  "imgURL",
  "lorem ipsum dolor sit amet",
  ["twitter.com/account", "github.com/account", "linkedin.com/in/account"],
  [Interests.FRONTEND, Interests.BACKEND, Interests.DEVOPS],
  [Languages.ENGLISH, Languages.TURKISH]
);

const john = new User(
  2,
  "John Doe",
  "john.doe",
  "https://johndoe.com/image.jpg",
  "Hey, I am John Doe.",
  ["https://www.instagram.com/johndoe"],
  [Interests.BACKEND],
  [Languages.ENGLISH]
);

const kristina = new User(
  3,
  "Kristina",
  "iamkristina",
  "/img/kristina.jpg",
  "Hi, this is Kristina, a web developer.",
  [],
  [Interests.FRONTEND, Interests.WEB_DEVELOPMENT],
  [Languages.RUSSIAN, Languages.ENGLISH]
);

const dennisRoom = dennis.createRoom(
  "Cool room",
  "This is the description of our cool room",
  Languages.ENGLISH,
  2,
  true,
  true,
  true,
  true,
  true,
  [Tags.JAVASCRIPT, Tags.PAIR_PROGRAMMING, Tags.WEB_DEVELOPMENT]
);

john.joinRoom(dennisRoom);
dennis.acceptWaitingUser();

// db.save("createdRooms", [dennisRoom]);
// db.save("users", [dennis, john]);
// db.insert("users", kristina);
// db.remove("users", 2);
const foundUser = db.findByName("users", "John Doe");

const createdRooms = db.load("createdRooms");
const users = db.load("users");

if (foundUser.onlineAtRoom) {
  console.log(
    colors.blue(`${foundUser.name}`),
    "online in a room with room ID",
    colors.bgRed.white(`${foundUser.onlineAtRoom.shareableLink}`)
  );
} else {
  console.log(
    colors.red(`${colors.bgRed.white(`${foundUser.name}`)} is not in a room`)
  );
}

// createdRooms.forEach((room) => {
//   console.log("Room:", room.title);
// });

// users.forEach((user) => {
//   console.log("User:", user.name);
// });
