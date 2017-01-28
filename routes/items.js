const Board = require( '../models/board' )
const BoardItem = require( '../models/board-item' )
const ObjectId = require( 'mongoose' ).mongo.ObjectID
const { createNewBoardItem, createPushSectionItemQuery, createPullSectionItemQuery } = require( './utilities' )

const addBoardItem = ( req, res ) => {
  const { id, section } = req.params
  const { user, text } = req.body

  const newBoardItem = createNewBoardItem( BoardItem, user, text, 0 )
  const query = createPushSectionItemQuery( id, section, newBoardItem )

  query.exec()
    .then( () => res.sendStatus( 200 ) )
    .catch( () => res.sendStatus( 400 ) )
}


const deleteBoardItem = ( req, res ) => {
  const { id, section, itemId } = req.params
  const query = createPullSectionItemQuery( id, section, itemId )

  query.exec()
    .then( () => res.sendStatus( 200 ) )
    .catch( () => res.sendStatus( 400 ) )
}

module.exports = {
  addBoardItem,
  deleteBoardItem
}
