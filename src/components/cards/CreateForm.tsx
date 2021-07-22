import React from 'react';
import { useSelector } from 'react-redux';
import { IBlogs } from '../../interfaces/blog.interface';
import { InputChange, RootStore } from '../../interfaces/react.interface';

interface IProps {
  blog: IBlogs;
  setBlog: (blog: IBlogs) => void;
}

const CreateForm = ({ blog, setBlog }: IProps): JSX.Element => {
  const { categories } = useSelector((state: RootStore) => state);
  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
  };
  const handleChangeThumbnail = (e: InputChange) => {
    const { files } = e.target as HTMLInputElement;
    if (files) {
      const file = files[0];
      setBlog({ ...blog, thumbnail: file });
    }
  };
  return (
    <form>
      <div className="form-group position-relative">
        <input
          type="text"
          name="title"
          className="form-control"
          value={blog.title}
          onChange={handleChangeInput}
        />
        <small
          className="text-muted position-absolute"
          style={{ bottom: 0, right: '3px', opacity: '0.6' }}
        >
          {blog.title.length}/50
        </small>
      </div>
      <div className="form-group my-3">
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleChangeThumbnail}
        />
      </div>
      <div className="form-group position-relative">
        <textarea
          className="form-control"
          value={blog.description}
          rows={4}
          style={{ resize: 'none' }}
          name="description"
          onChange={handleChangeInput}
        />
        <small
          className="text-muted position-absolute"
          style={{ bottom: 0, right: '3px', opacity: '0.6' }}
        >
          {blog.description.length}/200
        </small>
      </div>
      <div className="form-group my-3">
        <select
          className="form-control text-capitalize"
          name="category"
          value={blog.category}
          onChange={handleChangeInput}
        >
          <option value="">Choose a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default CreateForm;
