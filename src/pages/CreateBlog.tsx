import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardHoriz from '../components/cards/CardHoriz';
import CreateForm from '../components/cards/CreateForm';
import NotFound from '../components/global/NotFound';
import { IBlogs } from '../interfaces/blog.interface';
import { RootStore } from '../interfaces/react.interface';
import ReactQuil from '../components/editor/ReactQuil';
import { validCreateBlog } from '../utils/valid';
import { TypeActions } from '../interfaces/actions.interface';
import { ALERT } from '../redux/constants/constants';
import { createBlog } from '../redux/actions/blog.actions';

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
  const [body, setBody] = useState('');
  const divRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!auth.accessToken) return;
    const check = validCreateBlog({ ...blog, content: text });
    if (check.errLength !== 0) {
      dispatch<TypeActions>({ type: ALERT, payload: { error: check.errMsg } });
      return;
    }
    const newData: IBlogs = { ...blog, content: body };
    dispatch(createBlog(newData));
  };

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    const content = div?.innerText as string;
    setText(content);
  }, [body]);

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
      <ReactQuil setBody={setBody} />
      <div ref={divRef} dangerouslySetInnerHTML={{ __html: body }} style={{ display: 'none' }} />
      <small>{text.length}</small>
      <button type="button" className="btn btn-dark mt-3 d-block mx-auto" onClick={handleSubmit}>
        Create Post
      </button>
    </div>
  );
};

export default CreateBlog;
