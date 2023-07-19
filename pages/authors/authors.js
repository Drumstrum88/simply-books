import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import AuthorCard from '../../components/authorCard';
import { getAuthors } from '../../api/authorData';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const { user } = useAuth();

  const getAllTheAuthors = useCallback(() => {
    getAuthors(user.uid).then(setAuthors);
  }, [user.uid]);

  useEffect(() => {
    getAllTheAuthors();
  }, [getAllTheAuthors]);

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
          />
        ))}
      </div>
    </div>
  );
}

export default Authors;
