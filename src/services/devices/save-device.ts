import { tempDB } from '../../app'
import { deviceDB } from '../../repositories/devices/prisma-devices-repository'

export async function saveDevice (deviceId: string) {
  await tempDB.remove(deviceId)
  const device = await deviceDB.findById(deviceId)
  if (device) return
  await deviceDB.create(deviceId)
}
