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
    if (this.state.term && this.state.location) {
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    }    

    event.preventDefault();
  }

  // handleKeyPress(event) {
  //   console.log(event.charCode);
  //   const eventKey = event.charCode;
  //   if (eventKey === 13) {
  //     this.handleSearch(event);
  //   }
  // }

  handleFocus(e) {
    e.preventDefault();
    e.target.select();
  }

  reHandleSearch(sortByOptionValue) {
    this.handleSortByChange(sortByOptionValue);
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
        <form className="SearchBar-fields" onSubmit={this.handleSearch}>
          <input id="input-biz"
                placeholder="Search For..." 
                onChange={this.handleTermChange} 
                onSubmit={this.handleSearch}
                onFocus={this.handleFocus} />
          <input id="input-place" 
                placeholder="Where?" 
                onChange={this.handleLocationChange}
                onSubmit={this.handleSearch}
                onFocus={this.handleFocus} />
        </form>
          <div className="SearchBar-submit">
            <button onClick={this.handleSearch}>Let's Go</button>
          </div>
      </div>
    );
  }
}

export default SearchBar;
