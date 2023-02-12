import React, { useEffect, useState, useContext } from 'react';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { Context } from '../index';

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const {store} = useContext(Context);

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      store.Search(searchTerm)
        .then(({ data }) => {
            setPins(data.results);
            setLoading(false);
        })
    } else {
        store.GetAllNews()
            .then(({ data }) => {
                setPins(data)
                setLoading(false);
            })
    }
  }, [searchTerm]);

  return (
    <div>

      {loading && <Spinner message="Жаналықтарды іздестірудеміз..." />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">Ешқандай жаналық табылмады(</div>
      )}
    </div>
  );
};

export default Search;