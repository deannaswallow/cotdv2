import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // Take a copy of existing state
    const fishes = {...this.state.fishes};
    // Add new fish to the copy that was pulled
    fishes[`fish${Date.now()}`] = fish;
    // Push the updated info back to state
    this.setState({
      fishes: fishes // you *can* do just fishes
    });
  };

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({
      fishes: fishes
    });
  };

  deleteFish = (key) => {
    const fishes = {...this.state.fishes};
    //to remove item from firebase, set it to null
    fishes[key] = null;
    this.setState({ fishes: fishes });
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    // Take a copy of existing state
    const order = {...this.state.order};
    // Add to or update order items
    order[key] = order[key] + 1 || 1;
    // Push the updated info back to state
    this.setState({
      order: order
    });
  };

  removeFromOrder = (key) => {
    const order = {...this.state.order};
    //because this is in local storage, you can just delete
    delete order[key]
    this.setState({ order: order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
        addFish={this.addFish}
        deleteFish={this.deleteFish}
        updateFish={this.updateFish}
        loadSampleFishes={this.loadSampleFishes}
        fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
