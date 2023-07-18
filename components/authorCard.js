/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleAuthor, getAuthors } from '../api/authorData';

function AuthorCard({ authorObj, onUpdate }) {
  const {
    first_name, last_name, email, firebaseKey,
  } = authorObj;

  const deleteThisAuthor = () => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      deleteSingleAuthor(authorObj.firebaseKey)
        .then(() => {
          if (onUpdate) {
            onUpdate(getAuthors());
          }
        })
        .catch((error) => {
          console.error('Error deleting author:', error);
        });
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{first_name} {last_name}</Card.Title>
        <Card.Text>
          {email}
        </Card.Text>
        <Link href={`/authors/${firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            Author Details
          </Button>
        </Link>
        <Link href={`/authors/edit/${firebaseKey}`} passHref>
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
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

AuthorCard.defaultProps = {
  authorObj: null,
  onUpdate: undefined,
};

export default AuthorCard;
