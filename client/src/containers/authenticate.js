import React from 'react';
import './authenticate.css'
import { Link, Redirect } from 'react-router-dom';
import { authenticate } from '../actions/authActions';
import { connect } from 'react-redux';


class Authenticate extends React.Component {

  state = {
    username: '',
    password: '',
    submitted: false
  }


handleChange(event) {
  const { name, value } = event.target;
  this.setState({ 
    [name]: value
  });
}

handleSubmit(event) {
  event.preventDefault();
  this.setState({ submitted: true });
  const { username, password } = this.state;
  const { authenticate } = this.props;
  if(username && password) {
    authenticate({ username, password });
  }
}

  render() {
    
    const { auth } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    if(auth.loggedIn === true && token){
      return (<Redirect to="/" />);
    }  
    else return (      
      <div className='authenticate-form'>
        <div className='authenticate-header'>SIGN IN</div>
        <form onSubmit={this.handleSubmit.bind(this)} style={{width: '100%'}}>
          <div className='authenticate-container'>
            <div className='authenticate-block-group'>
              <div className='input-icon'></div>
              <div className='input-container'>
                <input 
                  type='text' 
                  placeholder={'Username'} 
                  name='username' 
                  onChange = {this.handleChange.bind(this)}
                  className={auth.error ? 'incorrect' : ''}
                  >
                </input>
              </div>
            </div>
            <div className='authenticate-block-group'>
              <div className='input-icon'></div>
              <div className='input-container'>
                <input 
                  type='password' 
                  placeholder={'Password'} 
                  name='password' 
                  onChange = {this.handleChange.bind(this)}
                  className={auth.error ? 'incorrect' : ''}
                  >
                </input>
              </div>
            </div>
          </div>
          <div className='authenticate-form-buttons'>
            <button className='authenticate-submit-button' type='submit'>LOGIN</button>
          </div>
        </form>
        {auth.error === true && <div style={{'margin-top': '15px', 'color': '#f05656'}}>Username or password is incorrect</div>}
        <Link className = {'redirect-to-register'} to='/register'>CREATE ACCOUNT</Link>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    auth: store.auth,
  }
}

const mapDispatchToProps = dispatch => ({
  authenticate: auth => dispatch(authenticate(auth)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);