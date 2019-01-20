import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.reHandleSearch = this.reHandleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    };
  }

  getSortByClass(sortByOption) {
    return this.state.sortBy === sortByOption ? 'active' : '';
  }

  handleSortByChange(sortByOptionValue) {
    this.setState({sortBy: sortByOptionValue});

  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  handleLocationChange(event) {
    this.setState({location: event.target.value});

  }

  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);

    event.preventDefault();
  }

  handleKeyPress(event) {
    const eventKey = event.charCode;
    if (eventKey === 13) {
      this.handleSearch(event);
    }
  }

  handleFocus(e) {
    e.preventDefault();
    e.target.select();
  }

  reHandleSearch(sortByOptionValue) {
    this.handleSortByChange(sortByOptionValue);
    console.log(`This is the new sortByOptionValue: ${sortByOptionValue}`);
    if (this.props.businesses[0]) {
      this.props.searchYelp(this.state.term, this.state.location, sortByOptionValue);
    }
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (<li className={this.getSortByClass(sortByOptionValue)}
                  key={sortByOptionValue}
                  onClick={this.reHandleSearch.bind(this, sortByOptionValue)} >
                {sortByOption}
             </li>);
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses" onChange={this.handleTermChange} onFocus={this.handleFocus} onKeyPress={this.handleKeyPress} />
          <input placeholder="Where?" onFocus={this.handleFocus} onChange={this.handleLocationChange}
          onKeyPress={this.handleKeyPress} />
        </div>
        <div className="SearchBar-submit">
          <button onClick={this.handleSearch}>Let's Go</button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
