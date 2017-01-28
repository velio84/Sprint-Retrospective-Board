const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BoardItemSchema = new Schema({
  user: String,
  text: String,
  upVotes: Number
})

const BoardItemModel = mongoose.model('BoardItem', BoardItemSchema)

module.exports = BoardItemModel