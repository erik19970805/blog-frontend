import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Loading from '../../components/alert/Loading';
import CardVert from '../../components/cards/CardVert';
import Pagination from '../../components/global/Pagination';
import { IBlogs } from '../../interfaces/blog.interface';
import { IParams, RootStore } from '../../interfaces/react.interface';
import { getBlogsByCategoryId } from '../../redux/actions/blog.actions';

const BlogsByCategory = (): JSX.Element => {
  const [categoryId, setCategoryId] = useState('');
  const [blogs, setBlogs] = useState<IBlogs[]>();
  const [total, setTotal] = useState(0);
  const { categories, blogsCategory } = useSelector((state: RootStore) => state);
  const { slug } = useParams<IParams>();
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = history.location;

  useEffect(() => {
    const category = categories.find((item) => item.name === slug);
    if (category) setCategoryId(category._id as string);
  }, [categories, slug]);

  useEffect(() => {
    if (!categoryId) return;
    if (blogsCategory.every((item) => item.id !== categoryId)) {
      dispatch(getBlogsByCategoryId(categoryId, search));
    } else {
      const data = blogsCategory.find((item) => item.id === categoryId);
      if (!data) return;
      setBlogs(data.blogs);
      setTotal(data.total);
      if (data.search) history.push(data.search);
    }
  }, [blogsCategory, categoryId, dispatch, history, search]);

  const handlePagination = (num: number) => {
    const searchPagination = `?page=${num}`;
    dispatch(getBlogsByCategoryId(categoryId, searchPagination));
  };
  if (!blogs) return <Loading />;

  return (
    <div className="blogs_category">
      <div className="show_blogs">
        {blogs.map((blog) => (
          <CardVert key={blog._id} blog={blog} />
        ))}
      </div>
      {total > 1 && <Pagination total={total} callback={handlePagination} />}
    </div>
  );
};

export default BlogsByCategory;
