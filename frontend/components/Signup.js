import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      id
      email
    }
  }
`;

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => (
          <Form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              signup();
              this.setState({
                name: '',
                email: '',
                password: '',
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Signup</h2>
              <Error error={error} />
              <label htmlFor="name">
                <input type="text" name="name" placeholder="name" value={name} required onChange={this.saveToState} />
              </label>
              <label htmlFor="email">
                <input type="text" name="email" placeholder="email" value={email} required onChange={this.saveToState} />
              </label>
              <label htmlFor="password">
                <input type="password" name="password" placeholder="password" value={password} required onChange={this.saveToState} />
              </label>
              <button type="submit">Sign Up</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
