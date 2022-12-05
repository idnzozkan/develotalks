import { HMSReactiveStore } from '@100mslive/hms-video-store'

const hmsManager = new HMSReactiveStore()
hmsManager.triggerOnSubscribe()

// hmsStore is used to get the states of the joined room
const hmsStore = hmsManager.getStore()

// hmsActions is used to join a room or perform an action in the room
const hmsActions = hmsManager.getActions()

export { hmsStore, hmsActions }
