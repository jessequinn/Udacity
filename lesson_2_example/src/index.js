import React, { Component } from 'react'
import ReactDOM from 'react-dom'


class ContactLast extends Component {
  render() {
    const people = [
      {name: 'Michael'},
      {name: 'Ryan'},
      {name: 'Tyler'}
    ]
    return (
      <ol>
        {people.map((person,index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ol>
    )
  }
}

// const element = React.createElement('div', {
//   className: 'welcome-message'
// }, 'Hello World!')
//
// const element = React.createElement('div', null,
//   React.createElement('strong', null, 'hello world')
// )
//
// const element = React.createElement('ol', null,
//   React.createElement('li', null, 'Michael'),
//   React.createElement('li', null, 'Ryan'),
//   React.createElement('li', null, 'Tyler')
// )
//
// const element = React.createElement('ol', null,
//   people.map((person, index) => (
//     React.createElement('li', {
//       key: index
//     }, person.name )
//   ))
// )
//
// const element = <ol>
//   <li>{people[0].name}</li>
//   <li>{people[1].name}</li>
//   <li>{people[2].name}</li>
// </ol>
//

// debugger

ReactDOM.render(
  <ContactLast />,
  document.getElementById('root')
)
