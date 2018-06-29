import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Search from '../containers/search'
import * as BooksAPI from '../actions/books_api'

import MainContainer from '../containers/main_container'
import CurrentReading from '../containers/current_reading'
import WantedReading from '../containers/wanted_reading'
import ReadReading from '../containers/read_reading'



class App extends Component {
  state = {
    books: [],
    current: [],
    wanted: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  addCurrent = (book) => {
    this.setState((state) => (
      {
        wanted: state.wanted.filter((b) => b.id !== book.id)
      }
    ))
    this.setState((state) => (
      {
        read: state.read.filter((b) => b.id !== book.id)
      }
    ))
    this.setState((state) => (
      {
        current: state.current.concat([ book ])
      }
    ))
  }

  addWanted = (book) => {
    this.setState((state) => (
      {
        current: state.current.filter((b) => b.id !== book.id)
      }
    ))
    this.setState((state) => (
      {
        read: state.read.filter((b) => b.id !== book.id)
      }
    ))
    this.setState((state) => (
      {
        wanted: state.wanted.concat([ book ])
      }
    ))
  }

  addRead = (book) => {
    this.setState((state) => (
      {
        current: state.current.filter((b) => b.id !== book.id)
      }
    ))
    this.setState((state) => (
      {
        wanted: state.wanted.filter((b) => b.id !== book.id)
      }
    ))
    this.setState((state) => (
      {
        read: state.read.concat([ book ])
      }
    ))
  }


  // removeContact = (contact) => {
  //   this.setState((state) => (
  //     {
  //       contacts: state.contacts.filter((c) => c.id !== contact.id)
  //     }
  //   ))
  //
  //   ContactsAPI.remove(contact)
  // }
  //
  //   createContact(contact) {
    //   ContactsAPI.create(contact).then((contact) => {
    //     this.setState((state) => ({
    //       contacts: state.contacts.concat([ contact ])
    //     }))
    //   })
    // }

  render() {
    return (
        <Switch>
          <Route path='/search' render={() => (
              <Search books={this.state.books} onAddCurrent={this.addCurrent} onAddWanted={this.addWanted} onAddRead={this.addRead} currentBooks={this.state.current} wantedBooks={this.state.wanted} readBooks={this.state.read}/>
          )}/>
          <Route path='/' render={() => (
            <div className='container'>
              <MainContainer />
              <CurrentReading onAddCurrent={this.addCurrent} onAddWanted={this.addWanted} onAddRead={this.addRead} currentBooks={this.state.current} wantedBooks={this.state.wanted} readBooks={this.state.read}/>
              <WantedReading onAddCurrent={this.addCurrent} onAddWanted={this.addWanted} onAddRead={this.addRead} currentBooks={this.state.current} wantedBooks={this.state.wanted} readBooks={this.state.read}/>
              <ReadReading onAddCurrent={this.addCurrent} onAddWanted={this.addWanted} onAddRead={this.addRead} currentBooks={this.state.current} wantedBooks={this.state.wanted} readBooks={this.state.read}/>
            </div>
          )}/>
        </Switch>
    )
  }
}

export default App
