const { usersService, createdRoomsService } = require("./services")
const { printOnlineUserStats, printRoomStats } = require("./lib")

async function main() {
  try {
    const john = await usersService.findByName("John Doe")
    const kristina = await usersService.findByName("Kristina")

    john.joinRoom(kristina.createdRoom)
    await usersService.update(john)
    await createdRoomsService.update(kristina.createdRoom)

    kristina.kickOutParticipant(john)
    await usersService.update(john)
    await createdRoomsService.update(kristina.createdRoom)

    printOnlineUserStats([john])
    printRoomStats(kristina.createdRoom)
  } catch (error) {
    console.log(error)
  }
}

main()
