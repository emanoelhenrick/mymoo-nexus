import 'dotenv/config'
import { app } from './app'

const PORT = 10000

void app.listen({
  host: '0.0.0.0',
  port: PORT
}).then(() => {
  console.log(`MymMoo Nexus Server is running on port ${PORT}`)
})
