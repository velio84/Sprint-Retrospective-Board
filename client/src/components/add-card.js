import React, { PropTypes, Component } from 'react'
import '../css/add-card.css'

const defaultState = {
  username: '',
  text: '',
  isVisible: false
}

class AddCard extends Component {

  constructor(props) {
    super(props)

    this.state = defaultState

    this.clearState = this.clearState.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.toggleVisibility = this.toggleVisibility.bind(this)
  }

  clearState() {
    this.setState( defaultState )
  }

  handleUsernameChange(ev) {
    this.setState({ username: ev.target.value })
  }

  handleTextChange(ev) {
    this.setState({ text: ev.target.value })
  }

  handleSave() {
    const { username, text } = this.state
    const { onNewItemSave } = this.props

    onNewItemSave( username, text )
    this.clearState()
    this.toggleVisibility()
  }

  toggleVisibility() {
    this.setState({ isVisible: !this.state.isVisible })
  }

  render() {
    const { isVisible } = this.state
    const { customClassName } = this.props

    if ( !isVisible ) {
      return (
        <div className={ customClassName }>
          <input type="button" className="add-card-button" value="Add" onClick={ this.toggleVisibility } />
        </div>
      )
    }

    return (
      <div className={ customClassName }>
        <label htmlFor="username">Name: </label>
        <input type="text" id="username" onChange={ this.handleUsernameChange } value={ this.state.username } />
        <label htmlFor="text">Text: </label>
        <textarea id="text" rows="4" cols="50" onChange={ this.handleTextChange } value={ this.state.text }></textarea>
        <div className="add-card-actions">
          <input type="button" className="save-card-button" value="Save" onClick={ this.handleSave } />
          <input type="button" className="cancel-add-card-button danger" value="Cancel" onClick={ this.toggleVisibility } />
        </div>
      </div>
    )
  }

}

AddCard.propTypes = {
  onNewItemSave: PropTypes.func.isRequired,
  customClassName: PropTypes.string
}

export default AddCard
