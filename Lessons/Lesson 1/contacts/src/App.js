import React, { Component } from 'react';

import ContactList from './components/contact_list'


class App extends Component {
  render() {
    return (
      <div className="App">
        <ContactList contacts={[
            { name: 'Michael'},
            { name: 'Ryan'},
            { name: 'Tyler'}
          ]} />
          <ContactList contacts={[
            { name: 'Amanda'},
            { name: 'Richard'},
            { name: 'Geoff'}
          ]} />
      </div>
    );
  }
}

export default App;
