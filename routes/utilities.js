const Board = require('../models/board')
const BoardItem = require('../models/board-item')
const ObjectId = require('mongoose').mongo.ObjectID

const createNewBoardItem = ( BoardItem, user = '', text = '', upVotes = 0 ) => {
  return new BoardItem({
    user,
    text,
    upVotes
  })
}

const createPushSectionItemQuery = ( boardId, section, newBoardItem ) => {
  switch( section ) {
    case 'good':
      return Board.findByIdAndUpdate(
        boardId,
        { $push: { "sections.good": newBoardItem } },
        { safe: true, upsert: true, new: true }
      )
    case 'bad':
      return Board.findByIdAndUpdate(
        boardId,
        { $push: { "sections.bad": newBoardItem } },
        { safe: true, upsert: true, new: true }
      )
    case 'actions':
      return Board.findByIdAndUpdate(
        boardId,
        { $push: { "sections.actions": newBoardItem } },
        { safe: true, upsert: true, new: true }
      )
    default:
      return null
  }
}

const createPullSectionItemQuery = ( boardId, section, itemId ) => {
  switch( section ) {
    case 'good':
      return Board.findByIdAndUpdate(
        ObjectId( boardId ),
        { $pull: { "sections.good": { _id: ObjectId( itemId ) } } }
      )
    case 'bad':
      return Board.findByIdAndUpdate(
        ObjectId( boardId ),
        { $pull: { "sections.bad": { _id: ObjectId( itemId ) } } }
      )
    case 'actions':
      return Board.findByIdAndUpdate(
        ObjectId( boardId ),
        { $pull: { "sections.actions": { _id: ObjectId( itemId ) } } }
      )
    default:
      return null
  }

}

module.exports = {
  createNewBoardItem,
  createPushSectionItemQuery,
  createPullSectionItemQuery
}