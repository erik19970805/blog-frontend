import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NotFound from '../components/global/NotFound';
import { FormSutmit, RootStore } from '../interfaces/react.interface';
import { createCategory, deleteCategory, updateCategory } from '../redux/actions/category.actions';
import { IResCategory } from '../redux/types/category.types';

const Category = (): JSX.Element => {
  const [name, setName] = useState<undefined | string>('');
  const { auth, categories } = useSelector((state: RootStore) => state);
  const [edit, setEdit] = useState<IResCategory>();
  const dispatch = useDispatch();
  const handleSubmit = (e: FormSutmit) => {
    e.preventDefault();
    if (!auth.accessToken || !name) return;
    if (edit) {
      if (edit.name === name) return;
      const data = { ...edit, name };
      dispatch(updateCategory(data));
    } else {
      dispatch(createCategory(name));
    }
    setEdit(undefined);
  };

  const handleDelete = (id?: string) => {
    if (!auth.accessToken) return;
    dispatch(deleteCategory(id));
  };

  useEffect(() => {
    if (edit) setName(edit.name);
  }, [edit]);

  if (auth.user?.role !== 'admin') return <NotFound />;

  return (
    <div className="category">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <div className="d-flex aling-item-center">
          {edit && (
            <i
              className="fas fa-times me-2 text-danger"
              style={{ cursor: 'pointer' }}
              onClick={() => setEdit(undefined)}
            />
          )}
          <input
            type="text"
            name="category"
            id="category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">{edit ? 'Update' : 'Create'}</button>
        </div>
      </form>
      <div>
        {categories.map((category, i) => (
          <div className="category_row" key={i}>
            <p className="m-0 text-capitalize">{category.name}</p>
            <div>
              <i className="fas fa-edit mx-2" onClick={() => setEdit(category)} />
              <i className="fas fa-trash-alt" onClick={() => handleDelete(category._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
