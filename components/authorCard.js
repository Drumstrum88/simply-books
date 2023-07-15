/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleAuthor } from '../api/authorData';

function AuthorCard({ authorObj, onUpdate }) {
  if (!authorObj) {
    return null;
  }

  const {
    first_name, last_name, email, firebase_key,
  } = authorObj;

  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${first_name} ${last_name}?`)) {
      deleteSingleAuthor(firebase_key).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{first_name} {last_name}</Card.Title>
        <Card.Text>
          {email}
        </Card.Text>
        <Link href={`/author/${firebase_key}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/author/edit/${firebase_key}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisAuthor} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    firebase_key: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

AuthorCard.defaultProps = {
  authorObj: null,
};

export default AuthorCard;
