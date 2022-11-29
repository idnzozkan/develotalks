const app = require("../../")
const request = require("supertest")(app)

test("creates a new room", async () => {
  const userToCreate = {
    name: "Test User",
    username: "testuser",
    profilePhoto: "testuser.jpg",
    userBio: "Lorem ipsum dolor sit amet",
    socialLinks: ["https://www.linkedin.com/in/idnzozkan", "https://www.twitter.com/idnzozkan"],
    interests: ["Web Development", "Frontend"],
    spokenLangs: ["English", "Turkish"],
    createdRoom: null,
    activeRoom: null
  }

  const roomToCreate = {
    title: "Test Room Title",
    description: "Test room description",
    roomLanguage: "English",
    maxParticipants: 3,
    canUseMic: true,
    canUseWebcam: true,
    canShareScreen: true,
    canTypeToChatBox: true,
    isPrivate: true,
    roomTags: ["#javascript", "#frontend", "#backend"]
  }

  const userResponse = await request.post("/users").send(userToCreate).expect(200)

  const createdRoomResponse = await request
    .post(`/users/${userResponse.body._id}/room`)
    .send(roomToCreate)
    .expect(200)

  expect(createdRoomResponse.body).toMatchObject(roomToCreate)
})
