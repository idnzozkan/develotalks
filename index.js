const User = require("./user");
const Tags = require("./enums/Tags");
const Interests = require("./enums/Interests");
const Languages = require("./enums/Languages");
const { usersDatabase, createdRoomsDatabase } = require("./database");
const colors = require("colors");

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
printOnlineUserStats();

const createdRooms = createdRoomsDatabase.load();
fetchRooms("English");

function fetchRooms(lang, tag) {
  if (lang && !tag) {
    console.log(`Fetching ${lang} rooms...`);
    let filteredByLangRooms = createdRoomsDatabase.filterByLang(lang);
    filteredByLangRooms.forEach((room) => printRoomStats(room));
  } else if (tag && !lang) {
    console.log(`Fetching ${tag} rooms...`);
    let filteredByTagRooms = createdRoomsDatabase.filterByTag(tag);
    filteredByTagRooms.forEach((room) => printRoomStats(room));
  } else if (lang && tag) {
    console.log(`Fetching ${lang} and ${tag} rooms...`);
    let filteredByLangAndTagRooms = createdRoomsDatabase.filterByLangAndTag(
      lang,
      tag
    );
    filteredByLangAndTagRooms.forEach((room) => printRoomStats(room));
  } else {
    console.log(`Fetching all rooms...`);
    createdRooms.forEach((room) => {
      printRoomStats(room);
    });
  }
}

function printRoomStats(room) {
  console.log(`
  ${colors.bold(`Room ID:`)} ${room.id}
  ${colors.bold(`Title:`)} ${room.title} ${
    room.isPrivate ? `${colors.yellow(`[PRIVATE]`)}` : ``
  }
  ${colors.bold(`Language:`)} ${room.roomLanguage}
  ${colors.bold(`Tags:`)}  ${room.roomTags.toString()}
  ${colors.bold(`Capacity:`)} ${room.participants.length} / ${
    room.maxParticipants
  }

  ${colors.italic(
    `Createad by ${room.owner.name} ${Date.now() - room.createdAt} ms ago`
  )}

  ${colors.rainbow("* * * ")}
  `);
}

function printOnlineUserStats() {
  users.forEach((u) => {
    if (u.onlineAtRoom) {
      console.log(
        colors.green.bold(`${u.name}`),
        "online in a room with room ID",
        colors.bgGreen.black(`${u.onlineAtRoom.id}`)
      );
    } else {
      console.log(
        colors.red(`${colors.red.bold(`${u.name}`)} is not in a room`)
      );
    }
    console.log("---------------------");
  });
}
