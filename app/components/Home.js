import React, { Component } from 'react'

export default class Home extends Component {
  render () {
    return (
      <div>
        {'This is your home component, which is currently set as the IndexRoute in app/config/routes.js. It shows when no other routes are active.'}<br/>
        {'This boilerplate uses React, React-Router, Babel, ESLint, Webpack, and LESS'}
      </div>
    )
  }
}
