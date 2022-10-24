import { makeObservable, action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import SymbolBtn from '../../../UIHelper/SymbolBtn';

class HeaderBtn extends React.Component {
  active = '';
  wrapperRef = React.createRef();

  constructor(props) {
    super(props);
    makeObservable(this, {
      active: observable,
      toggleActive: action,
      handleClickOutside: action,
    });
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener(
      'mousedown',
      this.handleClickOutside.bind(this)
    );
  }

  handleClickOutside(e) {
    if (this.wrapperRef && !this?.wrapperRef?.current?.contains(e.target)) {
      this.active = '';
    }
  }

  toggleActive(e) {
    e.preventDefault();
    this.active = this.active === '' ? ' active' : '';
  }

  render() {
    const { View, symbol } = this.props;

    return (
      <div ref={this.wrapperRef}>
        <SymbolBtn
          active={this.active}
          symbol={symbol}
          clickAction={this.toggleActive.bind(this)}
        />
        <View active={this.active} />
      </div>
    );
  }
}

export default observer(HeaderBtn);
