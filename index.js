const User = require("./user");
const Tags = require("./enums/Tags");
const Interests = require("./enums/Interests");
const Languages = require("./enums/Languages");

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

john.joinRoom(dennisRoom);
kristina.joinRoom(dennisRoom);
dennis.acceptWaitingUser();
dennis.stopSession();
john.stopSession();
kristina.joinRoom(dennisRoom);
