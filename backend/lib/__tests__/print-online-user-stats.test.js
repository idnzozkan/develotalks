const printOnlineUserStats = require("../stats/print-online-user-stats")

test("prints users active in any room", () => {
  const users = [
    {
      name: "John Doe",
      activeRoom: { _id: "60cbd43e7f2728a7a338c42a" }
    }
  ]
  const consoleSpy = jest.spyOn(console, "log")

  printOnlineUserStats(users)

  expect(consoleSpy).toHaveBeenNthCalledWith(
    1,
    "John Doe is online in a room with room ID 60cbd43e7f2728a7a338c42a"
  )
  expect(consoleSpy).toHaveBeenNthCalledWith(2, "---------------------")

  consoleSpy.mockRestore()
})

test("prints users not active in any room", () => {
  const users = [
    {
      name: "Dennis Douglas",
      activeRoom: null
    }
  ]
  const consoleSpy = jest.spyOn(console, "log")

  printOnlineUserStats(users)

  expect(consoleSpy).toHaveBeenNthCalledWith(1, "Dennis Douglas is not in a room")
  expect(consoleSpy).toHaveBeenNthCalledWith(2, "---------------------")

  consoleSpy.mockRestore()
})
