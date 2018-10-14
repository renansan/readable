import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import Category from './views/Category'
import PostSingle from './views/PostSingle'
import PostEdit from './views/PostEdit'
import PageNotFound from './views/PageNotFound'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="readable">
        <header className="header">
          <h1><Link to="/">Readable</Link></h1>
          
          <Link to="/post/new" className="button">Add Post</Link>

          <nav>
            Categories
            <ul>
              <li><Link to="/category/cat-1">Category 1</Link></li>
              <li><Link to="/category/cat-2">Category 2</Link></li>
              <li><Link to="/category/cat-3">Category 3</Link></li>
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
        <footer>
          <p>Renan San - 2018.</p>
        </footer>
      </div>
    );
  }
}

export default App;
