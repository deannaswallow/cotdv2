import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func
  };

  handleChange = (event) => {
    //Copy and update the fish in question
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateFish(this.props.index, updatedFish);
  };
  render() {
    const { image, name, price, desc, status } = this.props.fish;
    return (
      <div className="fish-edit">
        <input name="name" type="text" value={name}
          onChange={this.handleChange}/>
        <input name="price" type="text" value={price}
          onChange={this.handleChange}/>
        <select name="status" type="text" value={status}
          onChange={this.handleChange}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" value={desc}
          onChange={this.handleChange}/>
        <input name="image" type="text" value={image}
          onChange={this.handleChange}/>
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
