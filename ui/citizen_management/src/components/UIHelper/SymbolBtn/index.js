import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import './styles.css';

class SymbolBtn extends React.Component {
  active = '';

  constructor(props) {
    super(props);
    makeObservable(this, {
      active: observable,
      toggleActive: action,
    });
  }

  toggleActive(e) {
    e.preventDefault();
    this.active = this.active === '' ? ' active' : '';
  }

  render() {
    const { active, clickAction, symbol } = this.props;

    return (
      <div>
        {active !== null && (
          <a className={'symbol' + active} href="/" onClick={clickAction}>
            <i class={symbol}></i>
          </a>
        )}
        {active === null && (
          <a
            className={'symbol' + this.active}
            href="/"
            onClick={this.toggleActive.bind(this)}
          >
            <i class={symbol}></i>
          </a>
        )}
      </div>
    );
  }
}

export default observer(SymbolBtn);
