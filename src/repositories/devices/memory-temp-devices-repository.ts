interface TempDevice {
  id: string
}

export class InMemoryTempDevicesRepository {
  private static Singleton: InMemoryTempDevicesRepository

  private constructor () {}

  public static getInstance () {
    if (InMemoryTempDevicesRepository.Singleton) {
      return InMemoryTempDevicesRepository.Singleton
    }

    InMemoryTempDevicesRepository.Singleton = new InMemoryTempDevicesRepository()
    return InMemoryTempDevicesRepository.Singleton
  }

  TempDevices: TempDevice[] = []

  public async save (id: string) {
    if (this.TempDevices.find(dev => dev.id === id)) return
    this.TempDevices.push({ id })
  }

  public async findAll () {
    return this.TempDevices
  }

  public async remove (id: string) {
    this.TempDevices = this.TempDevices.filter(dev => dev.id !== id)
  }
}

export default InMemoryTempDevicesRepository
