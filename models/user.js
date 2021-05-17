const Room = require("./room");
const colors = require("colors");
const { v4: uuidv4 } = require("uuid");

class User {
  constructor(
    name,
    username,
    profilePhoto,
    userBio,
    socialLinks,
    interests,
    spokenLangs
  ) {
    this.id = uuidv4();
    this.name = name;
    this.username = username;
    this.profilePhoto = profilePhoto;
    this.userBio = userBio;
    this.socialLinks = socialLinks;
    this.interests = interests;
    this.spokenLangs = spokenLangs;
    this.friends = [];
    this.followings = [];
    this.followers = [];
    this.messages = [];
    this.starCount = 0;
    this.starredUsers = [];
    this.isInAWaitingRoom = false;
    this.onlineAtRoom = null;
    this.createdRoom = null;
  }

  createRoom(
    title,
    description,
    roomLanguage,
    maxParticipants,
    canUseMic,
    canUseWebcam,
    canShareScreen,
    canTypeToChatBox,
    isPrivate,
    roomTags
  ) {
    if (this.onlineAtRoom) this.stopSession();

    const room = new Room(
      this,
      title,
      description,
      roomLanguage,
      maxParticipants,
      canUseMic,
      canUseWebcam,
      canShareScreen,
      canTypeToChatBox,
      isPrivate,
      roomTags
    );
    this.createdRoom = room;
    this.onlineAtRoom = room;

    return room;
  }

  joinRoom(room) {
    if (room.maxParticipants <= room.participants.length) {
      // ✘ CANNOT JOIN
      console.log(colors.yellow("Room is full"));
    } else if (room.kickedPeople.includes(this)) {
      // ✘ CANNOT JOIN
      console.log(colors.red("You have been banned from this room before"));
    } else if (this.onlineAtRoom === room) {
      // ✘ CANNOT JOIN
      console.log(colors.rainbow("You are already in this room"));
    } else if (room.isPrivate && this !== room.owner) {
      // ✘ CANNOT JOIN: user cannot directly join the room. take them to the waiting room
      console.log(
        colors.yellow(
          "This is a private room. You need to wait for you to be taken into the room by the owner."
        )
      );

      this.onlineAtRoom = null;
      room.waitingPeople.push(this);
      this.isInAWaitingRoom = true;
    } else {
      // ✔ CAN JOIN: user can join the room.

      if (this.isInAWaitingRoom) this.isInAWaitingRoom = false;

      this.onlineAtRoom = room;
      room.participants.push(this);

      console.log(
        colors.green(`${this.name} joined ${room.owner.name}'s room`)
      );
    }
  }

  stopSession() {
    if (this.isInAWaitingRoom) {
      this.isInAWaitingRoom = false;
    }
    this.onlineAtRoom.participants = this.onlineAtRoom.participants.filter(
      (participant) => participant.id !== this.id
    );
    this.onlineAtRoom = null;
    console.log(colors.magenta(`${this.name} left`));
  }

  // Owner methods
  kickOutParticipant(user) {
    if (this.id !== this.onlineAtRoom?.owner.id) {
      console.log(colors.red("You do not have permission to do this"));
    } else if (this.id === this.onlineAtRoom.owner.id && user.id === this.id) {
      console.log(colors.red("You cannot kick yourself. Try to disconnect."));
    } else {
      user.onlineAtRoom = null;
      this.createdRoom.participants = this.createdRoom.participants.filter(
        (participant) => participant.id !== user.id
      );
      this.createdRoom.kickedPeople.push(user);
      console.log(colors.red(`${user.name} kicked by ${this.name}`));
    }
  }

  removeBan(user) {
    if (this.createdRoom !== this.onlineAtRoom) {
      console.log(colors.red("You do not have permission to do this"));
    } else {
      this.createdRoom.kickedPeople = this.createdRoom.kickedPeople.filter(
        (bannedUser) => bannedUser.id !== user.id
      );
      console.log(colors.yellow(`${this.name} removed ${user.name}'s ban`));
    }
  }

  acceptWaitingUser(user) {
    // single user
    if (user) {
      this.createdRoom.waitingPeople = this.createdRoom.waitingPeople.filter(
        (waitingUser) => waitingUser.id !== user.id
      );
      user.isInAWaitingRoom = false;
      this.createdRoom.participants.push(user);
      user.onlineAtRoom = this.createdRoom;
      console.log(
        colors.cyan(`${this.name} accepted ${user.name}'s joining request`)
      );
    }
    // all users
    else {
      this.createdRoom.waitingPeople.map((waitingUser) => {
        console.log(
          colors.cyan(
            `${this.name} accepted ${waitingUser.name}'s joining request`
          )
        );
        return (waitingUser.isInAWaitingRoom = false);
      });
      this.createdRoom.waitingPeople.map(
        (waitingUser) => (waitingUser.onlineAtRoom = this.createdRoom)
      );

      this.createdRoom.participants = [
        ...this.createdRoom.participants,
        ...this.createdRoom.waitingPeople
      ];

      this.createdRoom.waitingPeople = [];
    }
  }

  static create({
    id,
    name,
    username,
    profilePhoto,
    userBio,
    socialLinks,
    interests,
    spokenLangs,
    friends,
    followings,
    followers,
    messages,
    starCount,
    starredUsers,
    isInAWaitingRoom,
    onlineAtRoom,
    createdRoom
  }) {
    const newUser = new User(
      name,
      username,
      profilePhoto,
      userBio,
      socialLinks,
      interests,
      spokenLangs
    );

    newUser.id = id;
    newUser.friends = friends;
    newUser.followings = followings;
    newUser.followers = followers;
    newUser.messages = messages;
    newUser.starCount = starCount;
    newUser.starredUsers = starredUsers;
    newUser.isInAWaitingRoom = isInAWaitingRoom;
    newUser.onlineAtRoom = onlineAtRoom;
    newUser.createdRoom = createdRoom;

    return newUser;
  }
}

module.exports = User;
