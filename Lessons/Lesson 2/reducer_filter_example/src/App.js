import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

/* Combining .filter() and .reduce()
 *
 * Using the musicData array, filter(), and reduce():
 *   - Filter the musicData array down to just the albums that have a
 *     combined artist + name string length of less than 25 characters
 *     (for example, looking at the first album it would be "Adele25" which
 *a     has a length of 7, so it should be included)
 *   - Then, on the array returned from filter(), call reduce()
 *   - The value returned reduce() returns the total number of sales
 *   - Store that returned number in a new totalAlbumSales variable
 *
 * Note:
 *   - You can chain the operations!
 *   - Do not delete the musicData variable
 *   - Do not alter any of the musicData content
 *   - Do not format the sales number; leave it as a long string of digits
 */

const musicData = [
    { artist: 'Adele', name: '25', sales: 1731000 },
    { artist: 'Drake', name: 'Views', sales: 1608000 },
    { artist: 'Beyonce', name: 'Lemonade', sales: 1554000 },
    { artist: 'Chris Stapleton', name: 'Traveller', sales: 1085000 },
    { artist: 'Pentatonix', name: 'A Pentatonix Christmas', sales: 904000 },
    { artist: 'Original Broadway Cast Recording', name: 'Hamilton: An American Musical', sales: 820000 },
    { artist: 'Twenty One Pilots', name: 'Blurryface', sales: 738000 },
    { artist: 'Prince', name: 'The Very Best of Prince', sales: 668000 },
    { artist: 'Rihanna', name: 'Anti', sales: 603000 },
    { artist: 'Justin Bieber', name: 'Purpose', sales: 554000 }
];

const totalAlbumSales = musicData.filter(data => data.artist.concat(data.name).length < 25).reduce((accumulator, currentValue) => {return accumulator + currentValue.sales;}, 0);

console.log(totalAlbumSales);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
