import React, { useEffect, useState } from 'react';
import notFound2 from '../assets/not-found2.png'
import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>

      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="nofileDiv flex flex-col justify-center items-center w-full ">
          <img src={notFound2} alt="" className='w-[100%] h-[100%]object-cover' />
          <h2 className="mt-10 text-center text-xl font-semibold ">No Pins Found!</h2>
        </div>
      )}
    </div>
  );
};

export default Search;
