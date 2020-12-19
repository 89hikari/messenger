import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { LoginForm, RegistrationForm } from './modules';
import fetch from 'isomorphic-fetch';

import { Auth, Home } from './pages';
import './index.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayed_form: 'login',
      logged_in: localStorage.getItem('token') == undefined ? false : true,
      username: '',
      id: null,
      allUsers: this.getAllUsers(),
      contacts: this.getContacts(),
      contact_name: '',
      contact_id: 1,
      message: '',
      contact_avatar: null,
      message_time: null,
      last_messages: [],
      messages: [],
    };
  }

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

  async componentDidMount() {
    if (this.state.logged_in) {
      this.setState({contacts: []})
        fetch('https://sleepy-waters-05131.herokuapp.com/token-refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          token: localStorage.getItem('token')
        })
      })
        .then(res => res.json())
        .then(json => {
          localStorage.setItem('token', json.token);
          this.setState({ displayed_form: 'home', logged_in: true, id: json.user.id, username: json.user.username});
        });

      setInterval(async () => {
        fetch('https://sleepy-waters-05131.herokuapp.com/users/contacts/', {
          method: "GET",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('token')}`,
            }
          }).then(res => res.json())
          .then(json => {
            this.setState({ contacts: json });
          });
        }, 7000)

        setInterval(async () => {
        fetch(`https://sleepy-waters-05131.herokuapp.com/messages/messages/?contact_id=${this.state.contact_id}`, {
          method: "GET",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('token')}`,
            }
          }).then(res => res.json())
          .then(json => {
            this.setState({ messages: json });
            return json;
    })
      }, 7000)
    }
  }

  createMessage = (toWhomId, text, date) => {
    fetch('https://sleepy-waters-05131.herokuapp.com/messages/messages/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        recipient_id: toWhomId,
        text: text,
        datetime: date
      })
    })
  }

  getMessages = (id) => {
    fetch(`https://sleepy-waters-05131.herokuapp.com/messages/messages/?contact_id=${id}`, {
          method: "GET",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('token')}`,
            }
          }).then(res => res.json())
          .then(json => {
            this.setState({ messages: json });
            return json;
    })
  }

  getContacts = () => {
    fetch('https://sleepy-waters-05131.herokuapp.com/users/contacts/', {
          method: "GET",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('token')}`,
            }
          }).then(res => res.json())
          .then((responseData) => {
            console.log(responseData);
            this.setState({
              contacts: responseData,
            })
            return responseData;
        })
  }

  handle_login = (e, data) => {
    e.preventDefault();
    this.setState({
      contacts: [],
    })
    fetch('https://sleepy-waters-05131.herokuapp.com/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: 'home',
          username: json.user.username,
          id: json.user.id,
        });
      });
        fetch('https://sleepy-waters-05131.herokuapp.com/users/contacts/', {
          method: "GET",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('token')}`,
            }
          }).then(res => res.json())
          .then(json => {
            this.setState({ contacts: json });
          });
  };

  addUser(id) {
    fetch('https://sleepy-waters-05131.herokuapp.com/users/contacts/', {
          method: "POST",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              id: id,
            })
          })
  }

  Rerender = () => {
    this.forceUpdate()
  }

  getAllUsers(){
    fetch('https://sleepy-waters-05131.herokuapp.com/users/users/', {
      method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('token')}`,
        }
      }).then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          allUsers: responseData,
        })
        return responseData;
      })
  }
  
  getUsers = () => {  
    let a = this.getAllUsers();
    return a;
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('https://sleepy-waters-05131.herokuapp.com/users/users/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          username: json.username,
          id: json.id,
          displayed_form: 'home'
        });
      });
      this.wait(1000)
        fetch('https://sleepy-waters-05131.herokuapp.com/users/contacts/', {
          method: "GET",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('token')}`,
            }
          }).then(res => res.json())
          .then(json => {
            this.setState({ contacts: json });
          });

  };

  handle_logout = () => {
    localStorage.setItem('token', undefined);
    this.setState({ logged_in: false, username: '' });
    this.setState({
      displayed_form: 'login'
    });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch(this.state.displayed_form){
      case 'login':
        form = <LoginForm handle_login={this.handle_login}/>
        return  <div className="auth__labels" >
                  <label className="signup__label" onClick={() => this.display_form('signup')}>Sign Up</label>
                  <LoginForm handle_login={this.handle_login} display_form={this.display_form}/>
                </div>
        break;
      case 'signup':
        form = <RegistrationForm handle_signup={this.handle_signup} />
        return <div className="auth__labels" >
                <label className="login__label" onClick={() => this.display_form('login')}>Login</label>
                <RegistrationForm handle_signup={this.handle_signup} display_form={this.display_form}/>
              </div>
        break;
      case 'home':
        form = 
        <div>
          
          {/*this.getMessages(this.state.contact_id)*/}
          <label className="logout" onClick={() => this.handle_logout()}>Logout</label>
          <Home getContacts={this.state.contacts} 
                contactName={this}
                contactData={this}
                addUser={this.addUser} 
                getMessages={this.getMessages}
                getAllUsers={this.state.allUsers} 
                refreshContacts={this.getContacts}
                createMessage={this.createMessage}
                />
        </div>

        break;
      default:
        form = 'login';
        return  <div className="auth__labels" >
                  <label className="login__label" onClick={() => this.display_form('login')}>Login</label>
                  <label className="signup__label" onClick={() => this.display_form('signup')}>Sign Up</label>
                </div>
    }
    return (
      <div className="wrapper">
        { form }
      </div>
    ); 
  }
}

export default App;
