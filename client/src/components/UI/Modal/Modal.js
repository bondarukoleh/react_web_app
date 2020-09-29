import React, {PureComponent} from 'react';
import style from './Modal.module.scss';
import Shade from '../Shade/Shade';
import PropTypes from 'prop-types';

class Modal extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Shade onClick={this.props.shadeClick} show={this.props.show}/>
        <div
          className={style.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-200vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

Modal.propTypes = {
  shadeClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Modal;
