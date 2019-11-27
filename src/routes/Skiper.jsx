import React from 'react'
// import { Router } from '@reach/router'

// import page
import Login from '../pages/Login/Login'
// import Home from '../pages/Home/Home'

// import components

const Skiper = () => {
  return (
    <>
      <Login
        exact
        path='/login'
        render={() => <Login refetch={this.props.refetch} />}
      />
    </>
  )
}

export default Skiper
