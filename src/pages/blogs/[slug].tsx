import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardVert from '../../components/cards/CardVert';
import NotFound from '../../components/global/NotFound';
import { IBlogs } from '../../interfaces/blog.interface';
import { IParams, RootStore } from '../../interfaces/react.interface';
import { getBlogsByCategoryId } from '../../redux/actions/blog.actions';

const BlogsByCategory = (): JSX.Element => {
  const [categoryId, setCategoryId] = useState('');
  const [blogs, setBlogs] = useState<IBlogs[]>();
  const [total, setTotal] = useState(0);
  const { categories, blogsCategory } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const { slug } = useParams<IParams>();

  useEffect(() => {
    const category = categories.find((item) => item.name === slug);
    if (category) setCategoryId(category._id as string);
  }, [categories, slug]);

  useEffect(() => {
    if (!categoryId) return;
    if (blogsCategory.every((item) => item.id !== categoryId)) {
      dispatch(getBlogsByCategoryId(categoryId));
    } else {
      const data = blogsCategory.find((item) => item.id === categoryId);
      if (!data) return;
      setBlogs(data.blogs);
      setTotal(data.total);
    }
  }, [blogsCategory, categoryId, dispatch]);

  if (!blogs) return <NotFound />;

  return (
    <div className="blogs_category">
      <div className="show_blogs">
        {blogs.map((blog) => (
          <CardVert key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsByCategory;
