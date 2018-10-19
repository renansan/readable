import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import Category from './views/Category'
import PostSingle from './views/PostSingle'
import PostEdit from './views/PostEdit'
import PageNotFound from './views/PageNotFound'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
// import * as ReadableAPI from './api/ReadableAPI'
import './scss/app.scss';

// ReadableAPI.getCategories().then((cat) => {
//   debugger;
// });

library.add(faChevronUp, faChevronDown);

const categories = [
  {
    name: 'React',
    path: 'react',
  },
  {
    name: 'Redux',
    path: 'redux',
  },
  {
    name: 'Udacity',
    path: 'udacity',
  },
]

class App extends Component {
  render() {
    return (
      <div className="readable">
        <header className="header">
          <div className="header__logo">
            <Link to="/">Readable</Link>
          </div>

          <div className="header__section">
            <Link to="/post/new" className="button">Add Post</Link>
          </div>

          <nav className="header-nav header__section">
            <h2 className="header-nav__title">Categories</h2>
            <ul className="header-nav__list">
              {categories.length ? categories.map((cat, index) => (
                <li key={index} className="header-nav__item"><Link  className="header-nav__link" to={`/category/${cat.path}`}>{cat.name}</Link></li>
              )) : ''}
            </ul>
          </nav>

        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/category/:category" component={Category} />
            <Route path="/post/new" component={PostEdit} />
            <Route path="/post/edit/:post" component={PostEdit} />
            <Route path="/:category/:post" component={PostSingle} />
            <Route component={PageNotFound} />
          </Switch>
        </main>
        <footer className="footer">
          <p className="footer__credits">Renan San - 2018</p>
        </footer>
      </div>
    );
  }
}

export default App;
