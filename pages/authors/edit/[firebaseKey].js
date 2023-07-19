import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleAuthor } from '../../../api/authorData';
import AuthorForm from '../../../components/forms/AuthorForm';

export default function EditAuthor() {
  const [editAuthor, setEditAuthor] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleAuthor(firebaseKey).then(setEditAuthor);
  }, [firebaseKey]);

  return (<AuthorForm obj={editAuthor} />);
}
