import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ListContacts from './components/list_contacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './components/create_contacts'


class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  removeContact = (contact) => {
    this.setState((state) => (
      {
        contacts: state.contacts.filter((c) => c.id !== contact.id)
      }
    ))

    ContactsAPI.remove(contact)
  }

  createContact(contact) {
    ContactsAPI.create(contact).then((contact) => {
      this.setState((state) => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path='/create' render={({ history }) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.createContact(contact)
                history.push('/')
              }}
            />
          )} />
          <Route path='/' render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
            />
          )} />
        </Switch>
      </div>
    )
  }
}

export default App;
