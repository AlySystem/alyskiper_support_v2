import React from 'react'

const Title = props => {
  return <h1 className='hljs-title' style={{ color: 'white' }}>{props.title}</h1>
}

Title.defaultProps = {
  title: 'Undefine'
}

export default Title
