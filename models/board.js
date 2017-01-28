const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BoardSchema = new Schema({
  boardName: String,
  sections: {
    good: Array,
    bad: Array,
    actions: Array
  }
  
})

const BoardModel = mongoose.model('Board', BoardSchema)

module.exports = BoardModel