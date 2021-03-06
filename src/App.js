import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories } from './actions'
import Home from './views/Home'
import Category from './views/Category'
import PostSingle from './views/PostSingle'
import PostEdit from './views/PostEdit'
import PageNotFound from './views/PageNotFound'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPaperPlane,
  faPlus,
  faTimes,
  faEllipsisV,
  faTrashAlt,
  faEdit,
  faChevronUp,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons'
import * as ReadableAPI from './api/ReadableAPI'
import './scss/app.scss';

window.ReadableAPI = ReadableAPI;

library.add(faPaperPlane, faPlus, faTimes, faEllipsisV, faTrashAlt, faEdit, faChevronUp, faChevronDown);

class App extends Component {

  componentDidMount() {
    this.props.getCategories();
    this.props.getAllPosts();
  }

  render() {
    const categories = this.props.categories;
    return (
      <div className="readable">
        <header className="header">
          <div className="header__logo">
            <Link to="/">Readable</Link>
          </div>

          <div className="header__section">
            <Link to="/post/new" className="button">
              <FontAwesomeIcon className="button__icon" icon="plus" />
              Add Post
            </Link>
          </div>

          <nav className="header-nav header__section">
            <h2 className="header-nav__title">Categories</h2>
            <ul className="header-nav__list">
              {categories.length ? categories.map((cat, index) => (
                <li key={index} className="header-nav__item"><Link  className="header-nav__link" to={`/${cat.path}`}>{cat.name}</Link></li>
              )) : ''}
            </ul>
          </nav>

        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/post/new" component={PostEdit} />
            <Route exact path="/:category" component={Category} />
            <Route path="/:category/:post/" component={PostSingle} />
            <Route path="*" component={PageNotFound} status={404} />
          </Switch>
        </main>
        <footer className="footer">
          <p className="footer__credits">Renan San - 2018</p>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: (cb) => dispatch(fetchCategories(cb)),
    getAllPosts: (cb) => dispatch(fetchPosts(cb)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
