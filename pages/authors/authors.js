import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { deleteSingleAuthor, getAuthors } from '../../api/authorData';
import AuthorCard from '../../components/authorCard';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const { user } = useAuth();

  const getAllTheAuthors = useCallback(() => {
    getAuthors(user.uid).then(setAuthors);
  }, [user.uid]);

  useEffect(() => {
    getAllTheAuthors();
  }, [getAllTheAuthors]);

  const onDeleteAuthor = (authorId) => {
    deleteSingleAuthor(authorId)
      .then(() => {
        getAllTheAuthors();
      })
      .catch((error) => {
        console.error('Error deleting author:', error);
      });
  };

  return (
    <div className="text-center my-4">
      <Link passHref href="/authors/new">
        <Button>Add An Author</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {authors.map((author) => (
          <AuthorCard
            key={author.firebaseKey}
            authorObj={author}
            onUpdate={getAllTheAuthors}
            onDeleteAuthor={onDeleteAuthor}
          />
        ))}
      </div>
    </div>
  );
}

export default Authors;
