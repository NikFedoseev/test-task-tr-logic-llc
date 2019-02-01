import React from 'react';
import { checkToken } from '../actions/dashboardAction';
import { connect } from 'react-redux';

import './dashboard.css'

class Dashboard extends React.Component {

  state = {
    verify: false,
    user: ''
  }

  componentWillMount() {
    const { checkToken } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    checkToken(token)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dashboard.user) {
      this.setState({
        verify: nextProps.dashboard.verify,
        user: nextProps.dashboard.user
      })
    }
  }

  handleLogOut() {
    const { checkToken } = this.props;
    localStorage.removeItem('token');
    checkToken('')   
  }

  render() {
    const { username, firstName, lastName, email, country } = this.state.user;
    return (
      <div className='dashboard'>
        <div className='dashboard-content'>
          <div className='dashboard-photo'>
            <div className='dashboard-user-photo'></div>
          </div>
            <div className='dashboard-info'>
              <div className='dashboard-info-top'>
                <h2 className='dashboard-username'>{username}</h2>
              </div>
              <div className='dashboard-info-basic'>
                <div className='dasboard-first-name'>First name: {firstName}</div>
                <div className='dasboard-last-name'>Last name: {lastName}</div>
                <div className='dasboard-email'>Email: {email}</div>
                <div className='dasboard-country'>Country: {country}</div>
              </div>
            </div>
        </div>
        <div className='dashboard-footer'>
          <span  className ='dashboard-logout-button' onClick={this.handleLogOut.bind(this)}>LOG OUT</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    dashboard: store.dashboard,
  }
}

const mapDispatchToProps = dispatch => ({
  checkToken: token => dispatch(checkToken(token)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);