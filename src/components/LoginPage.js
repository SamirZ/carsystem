import React from 'react';
import { connect } from 'react-redux';
import { startLogin, setToken } from '../actions/auth';
import { Button } from 'react-bootstrap';

class LoginPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      email: props.user ? props.user.email : '',
      password: props.user ? props.user.password : '',
      error: ''
    };
  }

  componentWillMount(){
    const token = localStorage.getItem("token");
    if(!!token){
      this.props.setToken(token);
    }
  }

  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.email || !this.state.password) {
      this.setState(() => ({ error: 'Please provide email and password.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.startLogin({
        email: this.state.email,
        password: this.state.password
      });
      this.props.history.push('/dashboard');
    }
  };

  render(){
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <form className="form" onSubmit={this.onSubmit}>
            {this.state.error && <p className="form__error" >{this.state.error}</p>}
            <input
              name="email"
              type="email"
              className="text-input"
              placeholder="Email"
              autoFocus
              value={this.state.email}
              onChange={this.onEmailChange}
            />
            <input
              name="password"
              type="password"
              className="text-input"
              placeholder="Password"
              autoFocus
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
            <div>
              <button className="button btn-primary">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: (user) => dispatch(startLogin(user)),
  setToken: (token) => dispatch(setToken(token))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
