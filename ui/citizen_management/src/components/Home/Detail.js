import React, { Component } from 'react';

export default class Test extends Component {
  render() {
    return (
      <div>
        <i class={this.props.img}></i>
        <span className="manage--title">{this.props.title}</span>
        <div className="home-quantum">
          <span>{this.props.quantum}</span>
        </div>
      </div>
    );
  }
}
