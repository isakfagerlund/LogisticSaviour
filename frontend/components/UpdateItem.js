import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';

const UPDATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $image: String
  ) {
    createItem(
      title: $title
      image: $image
    ){
      id
    }
  }
`;

class UpdateItem extends Component {
  state = {
    title: '',
    image: '',
    largeImage: '',
    uploadingImage: false,
  }

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  }

  render() {
    const { uploadingImage, title } = this.state;
    return (
      <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <form onSubmit={async (e) => {
            e.preventDefault();
            const res = await createItem();
            console.log(res);
          }}
          >
            <Error error={error} />
            <fieldset disabled={loading || uploadingImage} aria-busy={loading || uploadingImage}>
              <label htmlFor="title">
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={title}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </form>
        )}
      </Mutation>
    );
  }
}

UpdateItem.defaultProps = {
  withImage: false,
};

UpdateItem.propTypes = {
  withImage: PropTypes.bool,
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
