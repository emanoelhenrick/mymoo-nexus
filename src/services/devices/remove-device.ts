import { deviceDB } from '../../repositories/devices/prisma-devices-repository'

export async function removeDevice (deviceId: string) {
  const device = await deviceDB.findById(deviceId)
  if (!device) return
  await deviceDB.remove(deviceId)
}
