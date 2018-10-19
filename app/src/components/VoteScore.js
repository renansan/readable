import React, { Component } from 'react';
import { connect } from 'react-redux'
import { upvote, downvote } from '../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class VoteScore extends Component {
  constructor(props) {
    super(props);
    this.upvote = props.upvote;
    this.downvote = props.downvote;
  }

  render() {
    const {id, voteScore} = this.props.post;
    return (
      <div className="score">
        <button
          type="button"
          className="score__vote-button score__update"
          title="Upvote"
          onClick={() => this.upvote(id)}>
          <FontAwesomeIcon className="score__icon" icon="chevron-up" />
        </button>
        <span className="score__current">{voteScore}</span>
        <button
          type="button"
          className="score__vote-button score__downdate"
          title="Downvote"
          onClick={() => this.downvote(id)}>
          <FontAwesomeIcon className="score__icon" icon="chevron-down" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }, { id }) => {
  const post = posts.filter(item => item.id === id)[0];
  return { post }
};

const mapDispatchToProps = dispatch => {
  return {
    upvote: (id) => dispatch(upvote(id)),
    downvote: (id) => dispatch(downvote(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScore)
