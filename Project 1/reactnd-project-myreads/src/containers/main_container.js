import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class MainContainer extends Component {
    render() {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col-11'><h3><strong>Looking for a book?</strong></h3></div>
            <div className='col-1'><Link to='/search' className='btn btn-info'>Search Books</Link></div>
          </div>
        </div>
      )
    }
  }
