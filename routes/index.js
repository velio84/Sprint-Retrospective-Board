const root = require('./root')
const { loadBoards, createBoard, deleteBoardById } = require('./boards')
const { addBoardItem, deleteBoardItem } = require('./items')

const mount = ( app ) => {
  app.get('/', root)

  app.get( '/boards', loadBoards )
  app.post( '/boards', createBoard )

  app.post( '/boards/:id', deleteBoardById )

  app.post( '/boards/:id/:section', addBoardItem )
  app.post( '/boards/:id/:section/:itemId', deleteBoardItem )
}

module.exports = {
  mount
}