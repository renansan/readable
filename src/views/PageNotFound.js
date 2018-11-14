import React, { Component } from 'react';

class PageNotFound extends Component {
  render() {
    const customMessage = (this.props || {}).customMessage;
    return (
      <div className="404">
        <h1 className="page__title">404 - Page not found</h1>
        {customMessage && (
          <p className="page__subtitle">{customMessage}</p>
        )}
      </div>
    );
  }
}

export default PageNotFound;
