import React from 'react';

const Loading = (): JSX.Element => (
  <div className="d-flex justify-content-center my-4">
    <div className="spinner-boder" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Loading;
