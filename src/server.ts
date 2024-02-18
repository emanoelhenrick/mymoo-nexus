import { app } from './app'

app.listen({
  host: '0.0.0.0',
  port: 10000
}).then(() => {
  console.log('MyMoo Nexus Server running...')
})
