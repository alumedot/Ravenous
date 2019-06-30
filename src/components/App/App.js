import React from 'react';
import './App.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/Yelp';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          businesses: [],
          businessesAmount: 1,
          loading: false,
      };
      this.searchYelp = this.searchYelp.bind(this);
  }
  searchYelp(term, location, sortBy) {

    this.setState({loading: true});
    Yelp.search(term, location, sortBy)
        .then(businesses => {
            this.setState({businesses: businesses});

            this.setState({loading: false});
            if (this.state.businesses !== undefined) {
                const amount = this.state.businesses.length;
                this.setState({businessesAmount: amount});
            } else {
                this.setState({businessesAmount: 0})
            }
        }).catch(error => alert(error));
  }
  render() {
    return (
        <div className="App">
          <h1>ravenous</h1>
          <SearchBar searchYelp={this.searchYelp}
                     businessesAmount={this.state.businessesAmount}
                     loading={this.state.loading}/>
          <BusinessList businesses={this.state.businesses} />
        </div>
    )
  }
}

export default App;
