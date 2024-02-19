import { app } from './app'

const PORT = 10000

void app.listen({
  host: '0.0.0.0',
  port: PORT
}).then(() => {
  console.log(`MyMoo Nexus Server is running on port ${PORT}`)
})
