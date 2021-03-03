const app = require('express')()
const { router } = require('bull-board')
const Queue = require('bull')
const { setQueues, BullAdapter } = require('bull-board')
const config = require('./config')

const queues = (config.QUEUES || '').split(",").map(q => q.trim())

queues.forEach(queueName => {
    setQueues([
        new BullAdapter(new Queue(queueName, {
            redis: config.REDIS
        }))
    ]);
})

app.use('/', router)

app.listen(config.PORT, () => {
    console.log(`[BullBoard] Listening @ ${config.PORT}`)
    console.log(`[BullBoard] Queues: ${config.QUEUES}`)
})