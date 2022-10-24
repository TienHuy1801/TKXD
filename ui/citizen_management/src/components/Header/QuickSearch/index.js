import React from 'react';
import './styles.css';

export default class Quicksearch extends React.Component {
  render() {
    return (
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          name=""
          placeholder="Type to search"
        />
        <a className="search-btn" href="#">
          <i class="fas fa-search"></i>
        </a>
      </div>
    );
  }
}
