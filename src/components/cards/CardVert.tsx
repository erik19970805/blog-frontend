import React from 'react';
import { Link } from 'react-router-dom';
import { IBlogs } from '../../interfaces/blog.interface';

interface IProps {
  blog: IBlogs;
}

const CardVert = ({ blog }: IProps): JSX.Element => (
  <div className="card">
    {typeof blog.thumbnail === 'string' && (
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="card-img-top"
        style={{ height: '180px', objectFit: 'cover' }}
      />
    )}
    <div className="card-body">
      <h5 className="cart-title">{blog.title}</h5>
      <Link to={`/blog/${blog._id}`}>{`${blog.title.slice(0, 50)}...`}</Link>
      <p className="card-text">{`${blog.description.slice(0, 100)}...`}</p>
      <p className="card-text d-flex justify-content-between">
        <small className="text-muted text-capitalize">
          {typeof blog.user !== 'string' && (
            <Link to={`/profile/${blog.user._id}`}>By: {blog.user.name}</Link>
          )}
        </small>
        <small className="text-muted">{new Date(blog.createdAt).toLocaleString()}</small>
      </p>
      <Link to="/" className="btn btn-primary">
        Boton
      </Link>
    </div>
  </div>
);

export default CardVert;