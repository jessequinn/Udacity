import React, { Component } from "react";
import * as axiosAPI from "../actions/actions";

export default class test extends Component {

  render() {
    //axiosAPI.getAll().then(response => response.data).then(data => console.log(data));
    axiosAPI.search("development").then(response => response.data).then(data => console.log(data));
    return <div>Hi</div>;
  }
}
