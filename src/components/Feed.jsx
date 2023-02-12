import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { Context } from '../index';

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  const {store} = useContext(Context);

  useEffect(() => {
    if (categoryId) {
        setLoading(true);
        store.FilterByCategory(categoryId)
          .then(({ data }) => {
            setPins(data.results)
            setLoading(false);
          })
          .catch((e) => console.log(e));

    } else {
        setLoading(true);
        store.GetAllNews()
            .then(({ data }) => {
                setPins(data)
                setLoading(false);
            })
            .catch((e) => console.log(e));
    }
  }, [categoryId])

  const ideaName = 'жаналықтар';
  if (loading) {
    return (
      <Spinner message={`Біз жаңа ${ideaName} іздестірудеміз!`} />
    );
  }
  return (
    <div>
      {pins && (
        <MasonryLayout pins={pins} />
      )}
    </div>
  );
};

export default Feed;