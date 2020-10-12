const httpRequestToBackend = require('./http_request')

function renderError (error) {
  return 'Error ' + error.message
}

const boardHandler = (req, res) => {
  const options = {
    host: req.config.backend_hostname,
    port: req.config.backend_port,
    path: '/board?name=' + req.params.board_name
  }

  httpRequestToBackend(options)
    .then((backedResponseBody) => {
      const boardData = backedResponseBody.payload.board_data
      res.render('board', {
        board_name: boardData.name,
        threads: boardData.threads
      })
    })
    .catch((error) => {
      res.send(renderError(error))
    })
}

module.exports = boardHandler
