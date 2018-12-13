import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  max-width: 200px;
`;
export default class Item extends Component {
  static propTypes ={
    item: PropTypes.object.isRequired,
  }

  render() {
    const { item } = this.props;
    return (
      <div>
        <p>{item.title}</p>
        {item.image.length > 1 ? <Image src={item.image} alt="itemImage" /> : null }
      </div>
    );
  }
}
