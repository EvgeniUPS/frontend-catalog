import React, { Component } from 'react'

import './item-add-form.css'

export default class ItemAddForm extends Component {
  state = {
    label: ''
  }
  onLabelChanged = e => {
    this.setState({
      label: e.target.value
      // label: e.target.value.toUpperCase()
    })
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onItemAdded(this.state.label)
    this.setState({
      label: ''
    })
  }

  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        {/* {this.state.label} */}
        <input
          type="text"
          className="form-control "
          onChange={this.onLabelChanged}
          placeholder="What needs to be done"
          value={this.state.label}
        />
        <button
          className="btn btn-outline-secondary"
          // onClick={() => this.props.onItemAdded('Hello world')}
        >
          Add Item
        </button>
      </form>
    )
  }
}
