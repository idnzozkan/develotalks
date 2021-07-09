const app = require("../../")
const request = require("supertest")(app)

test("creates a new user", async () => {
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

  const response = await request.post("/u").send(userToCreate).expect(200)

  const userCreated = response.body
  expect(userCreated.createdRoom).toEqual(null)
  expect(userCreated.activeRoom).toEqual(null)

  expect(userCreated).toMatchObject(userToCreate)
})
