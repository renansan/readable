import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class VoteScore extends Component {
  render() {
    return (
      <div className="score">
        <button type="button" className="score__vote-button score__update" title="Upvote"><FontAwesomeIcon className="score__icon" icon="chevron-up" /></button>
        <span className="score__current">0</span>
        <button type="button" className="score__vote-button score__downdate" title="Downvote"><FontAwesomeIcon className="score__icon" icon="chevron-down" /></button>
      </div>
    );
  }
}

export default VoteScore;
