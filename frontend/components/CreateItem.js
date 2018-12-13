import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
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

class CreateItem extends Component {
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

  uploadFile = async (e) => {
    console.log('Upload file...');
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'logistics');

    this.setState({
      uploadingImage: true,
    });

    const res = await fetch('https://api.cloudinary.com/v1_1/isak1337/image/upload', {
      method: 'POST',
      body: data,
    });

    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
      uploadingImage: false,
    });
  }

  render() {
    const { uploadingImage, title } = this.state;
    const { withImage } = this.props;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <form onSubmit={async (e) => {
            e.preventDefault();
            const res = await createItem();
            console.log(res);
            // Router.push({
            //   pathname: '/item',
            //   query: { id: res.data.createItem.id },
            // });
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
              {withImage ? (
                <label htmlFor="file">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Upload an image"
                    onChange={this.uploadFile}
                  />
                </label>
              ) : null}
              <button type="submit">Submit</button>
            </fieldset>
          </form>
        )}
      </Mutation>
    );
  }
}

CreateItem.defaultProps = {
  withImage: false,
};

CreateItem.propTypes = {
  withImage: PropTypes.bool,
};

export default CreateItem;
export { CREATE_ITEM_MUTATION };
