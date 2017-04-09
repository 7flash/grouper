import React, { Component, PropTypes } from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import Voting from './Voting.jsx'
import Waiting from './Waiting.jsx'
import Winner from './Winner.jsx'
import axios from 'axios'

class componentName extends Component {
  constructor (props) {
    super(props)
    this.state = {
      groupName: '',
      group: undefined,
      link: window.location.href
    }
  }

  componentDidMount () {
    // this.setState({ groupName: this.props.location.pathname.slice(8)})
    let groupName = this.props.location.pathname.slice(8)
    console.log(sessionStorage.getItem('name'))
    if (sessionStorage.getItem('name') === null) {
      axios.get('/api/groups/' + groupName)
      .then((res) => {
        console.log(res)
        res.data.index = 0
        this.setState({
          group: res.data,
          groupName: groupName
        })
        sessionStorage.setItem('name', groupName)
        console.log(sessionStorage.getItem('name'))
        this.forceUpdate()
        console.log('Force Update Triggered!')
        return res
      })
      .catch((err) => {
        console.error(err)
      })
    } else {
      // this.setState({group: sessionStorage.getItem()})
    }
  }

  render () {
    console.log(sessionStorage.getItem('name'))
    if (sessionStorage.getItem('name') === null) {
      return (
        <h1>LOADING</h1>
      )
    } else {
      return (
        <div>
          <Router>
            <div>
              <Route path='/voting' render={() => { return <Voting groupName={this.state.groupName} yelpData={this.state.group} /> }} />
              <Route path='/voting/waiting' render={() => { return <Waiting name={this.state.groupName} link={this.state.link} endTime={this.state.group.endTime} /> }} />
              <Route path='/voting/winner' render={() => { return <Winner name={this.state.groupName} /> }} />
            </div>
          </Router>
        </div>
      )
    }
  }
}

export default componentName
