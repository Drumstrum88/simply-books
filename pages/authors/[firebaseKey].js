/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BookCard from '../../components/BookCard';
import { viewAuthorDetails } from '../../api/mergedData';

export default function AuthorDetails() {
  const [authorData, setAuthorData] = useState(null);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    if (firebaseKey) {
      viewAuthorDetails(firebaseKey)
        .then((data) => setAuthorData(data))
        .catch((error) => {
          console.error('Error fetching author details:', error);
          setAuthorData(null);
        });
    }
  }, [firebaseKey]);

  if (!authorData) {
    return <p>Loading author details...</p>;
  }

  const {
    first_name, last_name, email, books,
  } = authorData;

  return (
    <div>
      <h1>Author Details</h1>
      <h2>{first_name} {last_name}</h2>
      <p>{email}</p>
      <h3>Books by {first_name}:</h3>
      {Array.isArray(books) && books.length > 0 ? (
        books.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} />
        ))
      ) : (
        <p>No books found for this author.</p>
      )}
    </div>
  );
}
