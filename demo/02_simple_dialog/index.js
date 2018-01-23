const Sqlssb = require('../../source')
const config1 = require('../service1.config.json')
const config2 = require('../service1.config.json')
const service1 = new Sqlssb(config1)
const service2 = new Sqlssb(config2)

service1.on('//sqlssb/demo_message', ctx => {
  if (ctx.message_body === 'STOP') {
    service1.stop()
    return
  }

  const n = parseInt(ctx.message_body, 10)

  if (n) {
    console.log(n)
    ctx.reply(n * 2)
  }
})

service2.on('//sqlssb/demo_message', ctx => {
  const n = parseInt(ctx.message_body, 10)

  if (n > 10) {
    ctx.reply('STOP')
    service2.stop()
    return
  }

  if (n) {
    console.log(n)
    ctx.reply(n * 2)
  }
})

service1.start()
service2.start()

service1.send('sqlssb_demo_queue_2', 1)