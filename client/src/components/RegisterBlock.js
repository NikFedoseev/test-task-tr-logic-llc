import React from 'react';

const getField = item => {
  return item === 'Password' || item === 'Re-type Password' ? 'password' 
  : item === 'Email' ? 'email': 'text'
}

const isTooltip = item => {
  return item === 'Password' || item === 'Email' || item ==='Username'
}

const getTooltip = item => {
  switch(true) {
    case item === 'Password':
      return 'min 6 symbols: 1 uppercase, 1 lowercase, 1 digit, 1 symbol require ';
    case item === 'Username':
      return 'A-z, 0-9, _ symbols allowed'
    default:
      return ''
  }
}

const BlockGroup = (item, i, onChange, name='',compare) => {
  return (
    <div className='register-block-group' key={i}>
      <div className='input-icon'></div>
      <div className='input-container'>
        <input 
          type={ getField(item) } 
          placeholder={item} 
          onChange={ (item === 'Re-type Password') ? compare : onChange} 
          name={name}>
          {}
        </input>
        { isTooltip(item) && <div className='tooltip'>{getTooltip(item)}</div>}
      </div>
    </div>
  )
}

export default class RegisterBlock extends React.Component {
  render() {
    return (
      <div className='register-block'>
        <span className='register-block-header'>Enter you personal detail</span>
        {this.props.details.map((item,i) => {
          return BlockGroup(item, i, this.props.onChange, this.props.names[i], this.props.compare);
        })}
      </div>
    )
  }
}