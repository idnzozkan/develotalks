const { usersDatabase, createdRoomsDatabase } = require("./database");
const { printOnlineUserStats, printRoomStats } = require("./lib");

const john = usersDatabase.findByName("John Doe");
const kristina = usersDatabase.findByName("Kristina");

john.joinRoom(kristina.createdRoom);
usersDatabase.update(john);
createdRoomsDatabase.update(kristina.createdRoom);

kristina.kickOutParticipant(john);
usersDatabase.update(john);
createdRoomsDatabase.update(kristina.createdRoom);

printOnlineUserStats([john]);
printRoomStats(kristina.createdRoom);
