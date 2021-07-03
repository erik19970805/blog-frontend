/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './components/global/NotFound';
import { IParams } from './interfaces/react.interface';

const generatePage = (name: string): JSX.Element => {
  const component = () => require(`./pages/${name}`).default;
  try {
    return React.createElement(component());
  } catch (error) {
    return <NotFound />;
  }
};

const PageRender = (): JSX.Element => {
  const { page, slug }: IParams = useParams();
  let name = '';
  if (page) {
    name = slug ? `${page}/[slug]` : `${page}`;
    name = slug ? name : name.charAt(0).toLocaleUpperCase() + name.slice(1);
  }
  return generatePage(name);
};

export default PageRender;
