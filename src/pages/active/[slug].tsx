import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IParams } from '../../interfaces/react.interface';
import { active } from '../../redux/actions/auth.actions';

const Active = (): JSX.Element => {
  const { slug }: IParams = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    if (slug) {
      dispatch(active({ activeToken: slug }));
    }
  }, [dispatch, slug]);
  return <div />;
};

export default Active;
