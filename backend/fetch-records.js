const { usersService, roomsService } = require("./services")
const { printOnlineUserStats, printRoomStats } = require("./lib")
require("./mongo-connection")

async function main() {
  try {
    const users = await usersService.load()

    printOnlineUserStats(users)
  } catch (error) {
    console.log(error)
  }
}

main()
