import React from 'react';
import { connect } from 'react-redux';
import RegisterBlock from '../components/RegisterBlock';
import { register } from '../actions/registerActions';
import history from '../utils/history';
import { Redirect } from 'react-router-dom';
import { validateEmail, validatePassword, validateUsername, validateText, validClass, checkValidation } from '../utils/validation';

import './register.css';

class Register extends React.Component {

  state = {
    user: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      username: '',
      password: ''
    },
    submitted: false,
    errors: null
  }

  comparePaswords(el1, el2) {
    const passField = document.querySelectorAll(`input[type='password']`)[0];
    const retypePassField = document.querySelectorAll(`input[type='password']`)[1];
    let valid = passField.value === retypePassField.value;
    validClass(valid, retypePassField);
  }

  validRetypePassword (event) {
    const { value } = event.target;
    let valid = this.state.user.password === value;
    validClass(valid, event.target)
  }

  handleChange(event) {
    if (!event.target.name) return
    const { name, value} = event.target;
    const { user } = this.state;
    const field = event.target;
    if(name === 'password') {
      let valid = validatePassword(value);
      validClass(valid, field) 
    }
    else if(name === 'email') {
      let valid = validateEmail(value);
      validClass(valid, field)
    }
    else if(name === 'username') {
      let valid = validateUsername(value);
      validClass(valid, field)
    }
    else {
      let valid = validateText(value);
      validClass(valid, field)
    }

    this.setState({
      user: {
        ...user,
        [name]: value
      }
    }, this.comparePaswords)
  }

  

  handleSubmit(event) {
    
    event.preventDefault();
    this.setState({
      submitted: true
    })
    const { user } = this.state;
    const { register } = this.props;
    if (checkValidation(this.state.user)) {
      register(user);
      console.log(this.state.user)
    }
  }

  renderInfo = () => {
    const { user } = this.props;
    if( user.submitted && user.errors == null && !user.isFetching){
      return <div style = {{'marginTop': '15px', 'color': '#36bfb5'}}>REGISTER SUCCESSFUL </div>
    }
    else if ( user.submitted && user.errors !== null && !user.isFetching ) {
      return <div style = {{'marginTop': '15px', 'color': '#f05656'}}>{user.errors}</div>
    }
  }

  render() {
    const { user } = this.props;
    const personalDetails = ['First Name','Last Name','Email','Country'];
    const registerDetails = ['Username','Password','Re-type Password'];
    const namesPersonal = ['firstName', 'lastName','email', 'country'];
    const namesRegister = ['username','password'];
    if( user.submitted && user.errors == null && !user.isFetching && user.redirect) {
      return <Redirect to='/authenticate'/>
    }  
    else return (
      <div className='register-form'>
        <div className='register-header'>SIGN UP</div>
        <form onSubmit={this.handleSubmit.bind(this)} style={{width: '100%'}}>
          <div className='register-container'>
            <RegisterBlock details = {personalDetails} onChange = {this.handleChange.bind(this)} names={namesPersonal}/>
            <RegisterBlock 
              details = {registerDetails} 
              onChange = {this.handleChange.bind(this)} 
              names={namesRegister}
              compare={this.validRetypePassword.bind(this)}
            />
          </div>
          <div className='register-form-buttons'>
            <button className='register-submit-button' type='submit'>submit</button>
            <button className='register-back-button' onClick={(e)=> history.goBack()}>back</button>
          </div>
        </form>
        {this.renderInfo()}
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
  }
}

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(register(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);