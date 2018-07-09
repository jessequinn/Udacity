import _ from "lodash";
import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


// import QuickLinks from './quick-links';
// import Categories from './categories';

// renderCategories()

const Sidebar = ({ location, categories }) => {
  return (
    <div className="col s12 m4 l3">
      <div className="collection">
        {_.map(categories, category => {
          return (
            <a href="#!" className="collection-item" key={category.name}>
              {category.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ categories }) => ({
  categories
})


export default withRouter(connect(mapStateToProps)(Sidebar));
