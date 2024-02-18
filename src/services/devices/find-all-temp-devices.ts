import { tempDB } from '../../app'

export async function findAllTempDevices () {
  return await tempDB.findAll()
}
