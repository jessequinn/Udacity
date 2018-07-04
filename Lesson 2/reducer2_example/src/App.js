import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

/* Popular Ice Cream Totals Quiz
 *
 * Using the data array and .reduce():
 *   - Return an object where each property is the name of an ice cream flavor
 *     and each value is an integer that's the total count of that flavor
 *   - Store the returned data in a new iceCreamTotals variable
 *
 * Notes:
 *   - Do not delete the data variable
 *   - Do not alter any of the data content
 */

 const data = [
     { name: 'Tyler', favoriteIceCreams: ['Strawberry', 'Vanilla', 'Chocolate', 'Cookies & Cream'] },
     { name: 'Richard', favoriteIceCreams: ['Cookies & Cream', 'Mint Chocolate Chip', 'Chocolate', 'Vanilla'] },
     { name: 'Amanda', favoriteIceCreams: ['Chocolate', 'Rocky Road', 'Pistachio', 'Banana'] },
     { name: 'Andrew', favoriteIceCreams: ['Vanilla', 'Chocolate', 'Mint Chocolate Chip'] },
     { name: 'David', favoriteIceCreams: ['Vanilla', 'French Vanilla', 'Vanilla Bean', 'Strawberry'] },
     { name: 'Karl', favoriteIceCreams: ['Strawberry', 'Chocolate', 'Mint Chocolate Chip'] }
 ];

// let iceCreamTotals = data
//   .reduce((accumulator, currentValue) => {
//     return currentValue.favoriteIceCreams.reduce((accumulator2, iceCream) => {
//       accumulator.push(iceCream);
//       return accumulator;
//     }, []);
//   }, [])
//   .reduce((accumulator, currentValue) => {
//     if (currentValue in accumulator) {
//       accumulator[currentValue]++;
//     } else {
//       accumulator[currentValue] = 1;
//     }
//     return accumulator;
//   }, {});
//
let iceCreamTotals = data.reduce((accumulator, currentValue) => {
  currentValue.favoriteIceCreams.forEach(name => {
    if (name in accumulator) {
      accumulator[name]++;
    } else {
      accumulator[name] = 1;
    }
  });

  return accumulator;
}, {});

console.log(iceCreamTotals);

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
