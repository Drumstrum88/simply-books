import React from 'react';
import { useRouter } from 'next/router';

export default function AuthorDetails() {
  const router = useRouter();
  const { firebaseKey } = router.query;

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <p>author test ${ firebaseKey }</p>
      </div>
    </div>
  );
}
