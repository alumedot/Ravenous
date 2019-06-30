import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match',
            zeroInput: false,
        };
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption ) {
            return 'active';
        }
    }
    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption
        });
    }
    handleTermChange(e) {
        this.setState({
            term: e.target.value
        });
    }
    handleLocationChange(e) {
        this.setState({
            location: e.target.value
        });
    }
    handleSearch(e) {
        if (this.state.term && this.state.location) {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            this.setState({
                zeroInput: false
            });
        } else {
            this.setState({
                zeroInput: true
            });
        }
        e.preventDefault();
    }
    zeroInput() {
        if(this.props.loading === false) {
            if(this.state.zeroInput === true) {
                return (
                    <h2 className='SearchBar-zeroResult'>Fill the blanks</h2>
                )
            }
        }
    }
    zeroResult() {
        if(this.props.loading === false) {
            if(this.state.zeroInput !== true) {
                if(this.props.businessesAmount === 0) {
                    return (
                        <div className='SearchBar-zeroResult'>
                            <h2>0 result</h2>
                            <p>let's try again!</p>
                        </div>
                    );
                }
            }
        }
    }
    loading() {
        if (this.props.loading === true) {
            return (
                <h2 className='SearchBar-loading'>Wait a second . . .</h2>
            );
        }
    }
    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
                       className={this.getSortByClass(sortByOptionValue)}
                       key={sortByOptionValue}>
                    {sortByOption}
                  </li>
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
                    <input onChange={this.handleTermChange}
                           placeholder="Search Businesses"
                    />
                    <input onChange={this.handleLocationChange}
                           placeholder="Where?"/>
                </div>
                <div onClick={this.handleSearch}
                     className="SearchBar-submit">
                    <a href="/">Let's Go</a>
                </div>
                {this.loading()}
                {this.zeroInput()}
                {this.zeroResult()}
            </div>
        )
    }
}

export default SearchBar;