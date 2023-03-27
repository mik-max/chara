import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import notFound2 from '../assets/not-found2.png'
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  const ideaName = categoryId || 'new';
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }
  return (
    <div className='relative'>
      {pins && (
        <MasonryLayout pins={pins} />
      )}
      {pins?.length === 0 &&  !loading && (
        <div className="nofileDiv flex flex-col justify-center items-center w-full ">
          <img src={notFound2} alt="" className='w-[100%] h-[100%]object-cover' />
          <h2 className="mt-10 text-center text-xl font-semibold ">No Pins Found!</h2>
        </div>
      )}
    </div>
  );
};

export default Feed;
