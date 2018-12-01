import React, { Component } from 'react'

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'
import ItemAddForm from '../item-add-form'
import data from './data.json'
import './app.css'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: data,
    // todoData: [
    //   this.createTodoItem('Drink Coffee'),
    //   this.createTodoItem('Make Awesome App'),
    //   this.createTodoItem('Have a lunch')
    //   // { label: 'Drink Coffee', important: false, id: 1 },
    //   // { label: 'Make Awesome App', important: true, id: 2 },
    //   // { label: 'Have a lunch', important: false, id: 3 }
    // ],
    term: '',
    filter: 'all' //active, all, done
  }

  createTodoItem(label) {
    return {
      // generate id ?

      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }
  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id)
      // todoData.splice(idx, 1) FAIL!!!

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArray
      }
    })
  }

  addItem = text => {
    // generate id ?
    const newItem = this.createTodoItem(text)
    //add element in array?
    this.setState(({ todoData }) => {
      // todoData.push(newItem)

      const newArray = [...todoData, newItem]
      return {
        todoData: newArray
      }
    })

    console.log('added', text)
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id)

    // 1. update object
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    // 2. construct new array
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      // const idx = todoData.findIndex(el => el.id === id)
      // // 1. update object
      // const oldItem = todoData[idx]
      // const newItem = { ...oldItem, done: !oldItem.done }
      // // 2. construct new array
      // const newArray = [
      //   ...todoData.slice(0, idx),
      //   newItem,
      //   ...todoData.slice(idx + 1)
      // ]
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
    console.log('Toggle Done', id)
  }

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  onSearchChange = term => {
    this.setState({ term })
  }
  onFilterChange = filter => {
    this.setState({ filter })
  }

  search(items, term) {
    if (term.length === 0) {
      return items
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter(item => !item.done)
      case 'done':
        return items.filter(item => item.done)
      default:
        return items
    }
  }

  render() {
    const { todoData, term, filter } = this.state

    const visibleItems = this.filter(this.search(todoData, term), filter)

    const doneCount = todoData.filter(el => el.done).length
    const todoCount = todoData.length - doneCount
    // console.log(doneCount)
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    )
  }
}
