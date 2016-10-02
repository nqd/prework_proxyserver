'use strict'

let stream = require('stream')
let logger = exports

// default level
logger.debugLevel = 'warning'

logger.log = function(logStream, level, message) {
  let levels = ['emerg', 'alert', 'crit', 'err', 'warning', 'notice', 'info', 'debug']
  if (levels.indexOf(level) <= levels.indexOf(this.debugLevel)) {
    if (message instanceof stream.Stream) {
      message.pipe(logStream, {end: false})
    }
    if (typeof message === 'string') {
      logStream.write(message)
    }
  }
}
