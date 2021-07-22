import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CardHoriz from '../components/cards/CardHoriz';
import CreateForm from '../components/cards/CreateForm';
import NotFound from '../components/global/NotFound';
import { IBlogs } from '../interfaces/blog.interface';
import { RootStore } from '../interfaces/react.interface';

const CreateBlog = (): JSX.Element => {
  const initState = {
    user: '',
    title: '',
    content: '',
    description: '',
    thumbnail: '',
    category: '',
    createdAt: new Date().toISOString(),
  };
  const [blog, setBolg] = useState<IBlogs>(initState);
  const { auth, categories } = useSelector((state: RootStore) => state);

  if (!auth.accessToken) return <NotFound />;

  return (
    <div className="my-4 create_blog">
      <h2>Create Blog</h2>
      <div className="row mt-4">
        <div className="col-md-6">
          <h5>Create</h5>
          <CreateForm blog={blog} setBlog={setBolg} />
        </div>
        <div className="col-md-6">
          <h5>Preview</h5>
          <CardHoriz blog={blog} />
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;