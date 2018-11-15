import React from 'react';

const PageNotFound = props => {
  const customMessage = (props || {}).customMessage;
  return (
    <div className="404">
      <h1 className="page__title">404 - Page not found</h1>
      {customMessage && (
        <p className="page__subtitle">{customMessage}</p>
      )}
    </div>
  );
}

export default PageNotFound;
