import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import AddCard from './add-card'
import boardActions from '../js/actions/board-actions'

import '../css/board-section.css'

const BoardItem = ( item, onDeleteItem ) => {
  const { _id, user, text } = item
  const userClassName = user.length > 0 ? 'item-author' : 'item-author hidden'
  const onDeleteItemHandler = () => onDeleteItem( item._id )

  return (
    <li key={ _id } className="board-item">
      <input type="button" value="x" className="board-item-delete danger" onClick={ onDeleteItemHandler } />
      <div className="item-text">{ text }</div>
      <div className={ userClassName }>{ user }</div>
    </li>
  )
}

const BoardSection = ( { sectionName, sectionItems, boardId, addBoardItem, deleteBoardItem } ) => {

  const onNewItemSave = ( user, text ) => {
    const section = sectionName.toLowerCase()
    addBoardItem( boardId, section, { user, text } )
  }

  const onDeleteItem = ( itemId ) => {
    deleteBoardItem( boardId, sectionName.toLowerCase(), itemId )
  }

  const sectionClassName = `board-section ${ sectionName.toLowerCase() }`
  const addCardClassName = `add-card ${ sectionName.toLowerCase() }`

  return (
    <section className={ sectionClassName }>
      <h3>{ sectionName }</h3>
      <ul>
        {
          sectionItems.map( item => {
            return BoardItem( item, onDeleteItem )
          })
        }
      </ul>
      <AddCard customClassName={ addCardClassName } onNewItemSave={ onNewItemSave } />
    </section>
  )
}

BoardSection.propTypes = {
  sectionName: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  sectionItems: PropTypes.array,
  addBoardItem: PropTypes.func.isRequired,
  deleteBoardItem: PropTypes.func.isRequired
}

const mapStateToProps = state => state

export default connect( mapStateToProps, boardActions )( BoardSection )
