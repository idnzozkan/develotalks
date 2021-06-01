const User = require("./models/user")
const Tags = require("./enums/Tags")
const Interests = require("./enums/Interests")
const Languages = require("./enums/Languages")
const { usersService, createdRoomsService } = require("./services")
const { printOnlineUserStats, printRoomStats } = require("./lib")

const dennis = User.create({
  name: "Deniz",
  username: "dennis",
  profilePhoto: "imgURL",
  userBio: "Lorem ipsum dolor sit amet",
  socialLinks: ["twitter.com/account", "github.com/account", "linkedin.com/in/account"],
  interests: [Interests.FRONTEND, Interests.BACKEND, Interests.DEVOPS],
  spokenLangs: [Languages.ENGLISH, Languages.TURKISH]
})

const kristina = User.create({
  name: "Kristina",
  username: "iamkristina",
  profilePhoto: "/img/kristina.jpg",
  userBio: "Hi, this is Kristina, a web developer.",
  socialLinks: [],
  interests: [Interests.FRONTEND, Interests.WEB_DEVELOPMENT],
  spokenLangs: [Languages.RUSSIAN, Languages.ENGLISH]
})

const mikasa = User.create({
  name: "Mikasa",
  username: "mikasa0123",
  profilePhoto: "https://example.com/image.jpg",
  userBio: "こんにちは、日本の三笠です",
  socialLinks: ["https://www.github.com/", "https://www.mikasa.dev"],
  interests: [Interests.FRONTEND],
  spokenLangs: [Languages.JAPANESE, Languages.ENGLISH]
})

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
)

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
)

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
)

async function main() {
  try {
    await usersService.save([dennis, kristina, mikasa])
    await createdRoomsService.save([dennisRoom, kristinaRoom, mikasaRoom])

    const john = User.create({
      name: "John Doe",
      username: "john.doe",
      profilePhoto: "https://johndoe.com/image.jpg",
      userBio: "Hey, I am John Doe.",
      socialLinks: ["https://www.instagram.com/johndoe"],
      interests: [Interests.BACKEND],
      spokenLangs: [Languages.ENGLISH]
    })

    await usersService.insert(john)

    const users = await usersService.load()
    printOnlineUserStats(users)

    const rooms = await createdRoomsService.load()
    rooms.forEach(printRoomStats)
  } catch (error) {
    console.log(error)
  }
}

main()
