

import React from 'react';
import { 
  Link, 
  useRouteMatch,
  Switch,
  Route,
  useParams,
  Redirect
} from 'react-router-dom';

import style from './styling/Search.module.css';

import SearchPage from './search/SearchPage';

function Search() {

  const { path, url } = useRouteMatch();

  console.log(`path:  ${path} url: ${url}`);

  return (

    <div className={style.main_view}>
      <div className={style.nav_type}> 
        <ul>
          <li>
            <Link to={`${url}`}>Search</Link>
          </li>
          <li>
            <Link to={`${url}/bycategory`}>Browse By Category</Link>
          </li>
          <li>
            <Link to={`${url}/byitem`}>Browse By Item</Link>
          </li>
        </ul>
      </div>

      <Switch>
        <Route exact path={`${path}`}>
          <SearchPage />
        </Route>
        <Route path={`${path}/:topicId`}>
          <SearchType />
        </Route>
      </Switch>

    </div>


  );

}

function SearchType() {
  const { topicId : page } = useParams();


  switch(page) {
    case 'bycategory':
      return (
      <div>
        <ByCategory />
      </div>
      );
    case 'byitem':
      return (
        <div>
          <ByItem />
        </div>
        );
    default:
      return (
        <Redirect to='/'></Redirect>
      );
  }

}

function ByItem() {
  return (
    <div>
      <h1>Browse By Item</h1>
    </div>
  );
}

function ByCategory() {
  return (
    <div>
      <h1>Browse By Category</h1>
    </div>
  );
}


export default Search;