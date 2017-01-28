const Board = require( '../models/board' )

const loadBoards = ( req, res ) => {
  Board.find()
    .then( boards => res.json( boards ) )
    .catch( () => res.sendStatus( 400 ) )
}

const createBoard = ( req, res ) => {
  const { boardName } = req.body

  const newBoard = new Board({
    boardName,
    sections: {
      good: [],
      bad: [],
      actions: []
    }
  })

  newBoard.save()
    .then( () => res.send( newBoard ) )
    .catch( () => res.sendStatus( 400 ) )
}

const deleteBoardById = ( req, res ) => {
  const { id } = req.params

  Board.findByIdAndRemove( id )
  .then( () => res.sendStatus( 200 ) )
  .catch( () => res.sendStatus( 400 ) )
}

module.exports = {
  loadBoards,
  createBoard,
  deleteBoardById
}
