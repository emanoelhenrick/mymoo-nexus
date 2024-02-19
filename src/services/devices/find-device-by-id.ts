import { deviceDB } from '../../repositories/devices/prisma-devices-repository'

export async function findDeviceById (deviceId: string) {
  return await deviceDB.findById(deviceId)
}
