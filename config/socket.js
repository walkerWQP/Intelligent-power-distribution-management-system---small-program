
const io = require('../utils/socket.io.js')

let url = 'http://114.115.221.203:8888/'

let wsStatus = false

let onSocket = null

export const connect = function (cb) {

  if (!onSocket) {

    onSocket = io(url)

    onSocket.on('connect', function (res) {

      cb(true, onSocket)

      wsStatus = true

    })

    setTimeout(function () {

      if (!wsStatus) {

        cb(false, onSocket)

      }

    }, 10000)

  } else {

    cb(true, onSocket)

  }

}