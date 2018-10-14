import React, { Component } from 'react';

class VoteScore extends Component {
  render() {
    return (
      <div className="score">
        <span className="score__current">0</span>
        <button type="button" className="score__update">Up</button>
        <button type="button" className="score__downdate">Down</button>
      </div>
    );
  }
}

export default VoteScore;
