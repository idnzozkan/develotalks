const User = require("./models/user");
const Tags = require("./enums/Tags");
const Interests = require("./enums/Interests");
const Languages = require("./enums/Languages");
const { usersDatabase, createdRoomsDatabase } = require("./database");
const { printOnlineUserStats, printRoomStats } = require("./lib");

const dennis = new User(
  "Deniz",
  "dennis",
  "imgURL",
  "lorem ipsum dolor sit amet",
  ["twitter.com/account", "github.com/account", "linkedin.com/in/account"],
  [Interests.FRONTEND, Interests.BACKEND, Interests.DEVOPS],
  [Languages.ENGLISH, Languages.TURKISH]
);

const john = new User(
  "John Doe",
  "john.doe",
  "https://johndoe.com/image.jpg",
  "Hey, I am John Doe.",
  ["https://www.instagram.com/johndoe"],
  [Interests.BACKEND],
  [Languages.ENGLISH]
);

const kristina = new User(
  "Kristina",
  "iamkristina",
  "/img/kristina.jpg",
  "Hi, this is Kristina, a web developer.",
  [],
  [Interests.FRONTEND, Interests.WEB_DEVELOPMENT],
  [Languages.RUSSIAN, Languages.ENGLISH]
);

const mikasa = new User(
  "Mikasa",
  "mikasa0123",
  "https://example.com/image.jpg",
  "こんにちは、日本の三笠です",
  ["https://www.github.com/", "https://www.mikasa.dev"],
  [Interests.FRONTEND],
  [Languages.JAPANESE, Languages.ENGLISH]
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

const kristinaRoom = kristina.createRoom(
  "Let's talk about computer science",
  "Welcome to my room! Feel free to introduce yourself!",
  Languages.ENGLISH,
  4,
  true,
  false,
  false,
  true,
  false,
  [Tags.COMPUTER_SCIENCE, Tags.CAREER]
);

const mikasaRoom = mikasa.createRoom(
  "ソフトウェア開発への熱意",
  "How to become like Eren at software development?",
  Languages.JAPANESE,
  10,
  true,
  true,
  true,
  false,
  false,
  [Tags.CAREER, Tags.JAVASCRIPT]
);

usersDatabase.save([dennis, john, kristina, mikasa]);
createdRoomsDatabase.save([dennisRoom, kristinaRoom, mikasaRoom]);

const users = usersDatabase.load();
printOnlineUserStats(users);

const createdRooms = createdRoomsDatabase.load();
createdRooms.forEach(printRoomStats);
