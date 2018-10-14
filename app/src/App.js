import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './views/Home'
import Category from './views/Category'
import PostDetails from './views/PostDetails'
import PostEdit from './views/PostEdit'
import PageNotFound from './views/PageNotFound'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="readable">
        <header className="header">
          <h1>Readable</h1>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/category/:category" component={Category} />
            <Route path="/post/:post" component={PostDetails} />
            <Route path="/post/edit/:post" component={PostEdit} />
            <Route component={PageNotFound} />
          </Switch>
        </main>
        <footer>
          <p>Made by Renan San - 2018.</p>
        </footer>
      </div>
    );
  }
}

export default App;
