import React, { Component } from 'react';
import { Consumer } from '../context';
import FormInput from './FormInput';
import axios from 'axios';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    console.log(this.state);
    const { name, email, phone } = this.state;

    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }

    if (email === '') {
      this.setState({ errors: { email: 'Phone is required' } });
      return;
    }

    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    // const res = axios.post(
    //   'https://jsonplaceholder.typicode.com/users',
    //   newContact
    // );
    // dispatch({ type: 'ADD_CONTACT', payload: res.data });

    axios
      .post('https://jsonplaceholder.typicode.com/users', newContact)
      .then(res => dispatch({ type: 'ADD_CONTACT', payload: res.data }));

    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    this.props.history.push('/');
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className='card mb-3'>
              <div className='card-header'>Add</div>
              <div className='card-body'>
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <FormInput
                    label='Name'
                    name='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <FormInput
                    label='Email'
                    name='email'
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <FormInput
                    label='Phone'
                    name='phone'
                    placeholder='Enter phone'
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type='submit'
                    value='Add Contact'
                    className='btn btn-block'
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
