import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';


class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }

  onChange = e => this.setState({[e.target.name]: e.target.value});

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    const errors = {};
    if (name === '') {
      errors.name = 'Name is required';
    }
    if (email === '') {
      errors.email = 'Email is required';
    }
    if (phone === '') {
      errors.phone = 'Phone is required';
    }
    if (Object.keys(errors).length > 0) {
      this.setState({ errors: errors});
      return;
    }
  
    const newContact = {
      name: name,
      email: email,
      phone: phone
    }

    const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
    dispatch({type: 'ADD_CONTACT', payload: res.data});


    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    })

    this.props.history.push("/");
  }

  render() {
    const { name, email, phone, errors } = this.state
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup name="name" label="Name" value={name}
                                  placeholder="Enter Name..." onChange={this.onChange}
                                  error={errors.name}
                  />
                  <TextInputGroup name="email" label="Email" value={email} type="email"
                                  placeholder="Enter Email..." onChange={this.onChange}
                                  error={errors.email}
                  />
                  <TextInputGroup name="phone" label="Phone" value={phone}
                                  placeholder="Enter Phone..." onChange={this.onChange}
                                  error={errors.phone}
                  />
                  <input type="submit" value="Add Contact" className="btn btn-block btn-light"/>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default AddContact;