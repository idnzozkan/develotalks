const colors = require("colors");

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

module.exports = printRoomStats;
