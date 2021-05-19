const { usersDatabase, createdRoomsDatabase } = require("./database")
const { printOnlineUserStats, printRoomStats } = require("./lib")

async function main() {
  const john = await usersDatabase.findByName("John Doe")
  const kristina = await usersDatabase.findByName("Kristina")
  const kristinasRoom = await createdRoomsDatabase.findByOwner("Kristina")

  john.joinRoom(kristinasRoom)
  await usersDatabase.update(john)
  await createdRoomsDatabase.update(kristinasRoom)

  kristina.kickOutParticipant(john)
  await usersDatabase.update(john)
  await createdRoomsDatabase.update(kristinasRoom)

  printOnlineUserStats([john])
  printRoomStats(kristinasRoom)
}

main()
