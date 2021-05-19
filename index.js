const { usersDatabase, createdRoomsDatabase } = require("./database")
const { printOnlineUserStats, printRoomStats } = require("./lib")

async function main() {
  try {
    const john = await usersDatabase.findByName("John Doe")
    const kristina = await usersDatabase.findByName("Kristina")

    john.joinRoom(kristina.createdRoom)
    await usersDatabase.update(john)
    await createdRoomsDatabase.update(kristina.createdRoom)

    kristina.kickOutParticipant(john)
    await usersDatabase.update(john)
    await createdRoomsDatabase.update(kristina.createdRoom)

    printOnlineUserStats([john])
    printRoomStats(kristina.createdRoom)
  } catch (error) {
    console.log(error)
  }
}

main()
