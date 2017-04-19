import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import checkAuth from './service/checkAuth.js'

// grommet
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Anchor from 'grommet/components/Anchor'
import Title from 'grommet/components/Title'
import Menu from 'grommet/components/Menu'
import Label from 'grommet/components/Label'

// Icons
import MenuIcon from 'grommet/components/icons/base/Menu'
import LoginIcon from 'grommet/components/icons/base/Login'
import LogoutIcon from 'grommet/components/icons/base/Logout'
import TrophyIcon from 'grommet/components/icons/base/Trophy'

class Nav extends Component {
  constructor (props) {
    super(props)
    this.logsout = this.logsout.bind(this)
  }

  componentWillMount () {
    checkAuth().then(signedIn => this.setState({signedIn}))
  }

  signin () {
    return (
      <Anchor
        path='/signin'
        icon={<LoginIcon />}
        label='Sign-In'
      />
    )
  }

  signup () {
    return (
      <Anchor
        path='/signup'
        icon={<LoginIcon />}
        label='Sign-Up'
      />
    )
  }

  logout () {
    return (
      <Anchor
        path='/'
        icon={<LogoutIcon />}
        label='Log-Out'
        onClick={this.logsout}
      />
    )
  }

  logsout () {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  profile () {
    return (
      <Anchor
        path='/profile'
        icon={<TrophyIcon />}
        label="Places You've Been"
      />
    )
  }

  render () {
    return (
      <Header float={false}
        fixed>
        <Box
          flex
          align='start'
          justify='start'
          margin='medium'
          pad='small'
          responsive
          >
          <Anchor
            path='/'
            size='medium'
            label={<Label>{<Title>Grüper</Title>}</Label>}
            />
        </Box>
        <Box
          flex
          align='end'
          justify='end'
          margin='medium'
          responsive
          >
          <Menu icon={<MenuIcon />}
            dropAlign={{'right': 'right'}}>
            {!localStorage.getItem('token') && this.signin()}
            {!localStorage.getItem('token') && this.signup()}
            {!!localStorage.getItem('token') && this.logout()}
            {!!localStorage.getItem('token') && this.profile()}
          </Menu>
        </Box>
      </Header>
    )
  }
}

export default Nav
