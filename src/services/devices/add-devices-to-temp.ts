import { tempDB } from '../../app'

export async function addToTempDevices (deviceId: string) {
  await tempDB.save(deviceId)
}
