import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
    }
  }
`;

class Signin extends Component {
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
      <Mutation mutation={SIGNIN_MUTATION} variables={this.state}>
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
              <h2>Signin</h2>
              <Error error={error} />
              <label htmlFor="email">
                <input type="text" name="email" placeholder="email" value={email} required onChange={this.saveToState} />
              </label>
              <label htmlFor="password">
                <input type="password" name="password" placeholder="password" value={password} required onChange={this.saveToState} />
              </label>
              <button type="submit">Sign In</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signin;
