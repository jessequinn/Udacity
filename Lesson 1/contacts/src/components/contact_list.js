import React, { Component } from 'react'

class ContactList extends Component {
  render() {
    const people = this.props.contacts
    
    return (
      <ol>
        {people.map((person,index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ol>
    )
  }
}

export default ContactList
