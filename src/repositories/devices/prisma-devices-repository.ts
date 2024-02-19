import { prisma } from '../../config/prisma/prisma'

class PrismaDevicesRepository {
  async findById (id: string) {
    const device = await prisma.device.findUnique({ where: { id } })
    return device
  }

  async create (id: string) {
    const device = await prisma.device.create({ data: { id } })
    return device
  }

  async remove (id: string) {
    const device = await prisma.device.delete({ where: { id } })
    return device
  }

  async update (id: string) {
    const device = await prisma.device.update({
      where: { id },
      data: {
        id, updated_at: new Date()
      }
    })
    return device
  }

  async count () {
    const count = await prisma.device.count()
    return count
  }

  async findMany (page: number) {
    const devices = await prisma.device.findMany({
      take: 20,
      skip: (page - 1) * 20
    })
    return devices
  }
}

export const deviceDB = new PrismaDevicesRepository()
