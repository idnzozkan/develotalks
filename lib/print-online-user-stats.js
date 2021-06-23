const colors = require("colors")

function printOnlineUserStats(users) {
  users.forEach(u => {
    if (u.activeRoom) {
      console.log(
        `${colors.green.bold(u.name)} is online in a room with room ID ${colors.bgGreen.black(
          u.activeRoom._id
        )}`
      )
    } else {
      console.log(colors.red(`${colors.red.bold(`${u.name}`)} is not in a room`))
    }
    console.log("---------------------")
  })
}

module.exports = printOnlineUserStats
