const app = require('express')()
const { router } = require('bull-board')
const Queue = require('bull')
const { setQueues, BullAdapter } = require('bull-board')
const config = require('./config')

const queueNames = (config.QUEUES || '').split(",").map(q => q.trim())
const queues = {}

queueNames.forEach(queueName => {
    queues[queueName] = new Queue(queueName, {
        redis: config.REDIS
    })
})

setQueues(queueNames.map(queueName => new BullAdapter(queues[queueName])))

console.log(config.REDIS)
console.log(queueNames)

app.use('/ui', router)

app.use('/add/:queueName/:queueType', async (req, res) => {
    const { opts = {}, ...obj } = req.query;
    const { queueName, queueType } = req.params
    const queue = queues[queueName]

    if (!queue) {
        return res.status(500).json({
            ok: false,
            error: `Invalid queue: ${queueName}`
        })
    }

    try {
        const job = await queue.add(queueType, obj, opts);

        res.json({
            ok: true,
            obj,
            opts,
            job
        })

    } catch (e) {

        res.status(500).json({
            ok: false,
            error: `${e}`
        })

    }
});

app.listen(config.PORT, () => {
    console.log(`[BullBoard] Listening @ ${config.PORT}`)
    console.log(`[BullBoard] Queues: ${config.QUEUES}`)
})