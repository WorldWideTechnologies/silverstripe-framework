import React from 'react';
import SilverStripeComponent from 'lib/SilverStripeComponent';
import { FormGroup, ControlLabel } from 'react-bootstrap-ss';
import castStringToElement from 'lib/castStringToElement';

function fieldHolder(Field) {
  class FieldHolder extends SilverStripeComponent {

    /**
     * Build description
     *
     * @returns {XML}
     */
    getDescription() {
      if (this.props.description === null) {
        return null;
      }

      return castStringToElement(
        'div',
        this.props.description,
        { className: 'form__field-description' }
      );
    }

    /**
     * Build title label
     *
     * @returns {XML}
     */
    getLeftTitle() {
      const labelText = this.props.leftTitle !== null
        ? this.props.leftTitle
        : this.props.title;

      if (!labelText || this.props.hideLabels) {
        return null;
      }

      return castStringToElement(
        ControlLabel,
        labelText,
        { className: 'form__field-label' }
      );
    }

    getRightTitle() {
      if (!this.props.rightTitle || this.props.hideLabels) {
        return null;
      }

      return castStringToElement(
        ControlLabel,
        this.props.rightTitle,
        { className: 'form__field-label' }
      );
    }

    getHolderProps() {
      // The extraClass property is defined on both the holder and element
      // for legacy reasons (same behaviour as PHP rendering)
      const classNames = [
        'field',
        this.props.extraClass,
      ];
      if (this.props.readOnly) {
        classNames.push('readonly');
      }

      return {
        bsClass: this.props.bsClass,
        bsSize: this.props.bsSize,
        validationState: this.props.validationState,
        className: classNames.join(' '),
        controlId: this.props.id,
        id: this.props.holderId,
      };
    }

    render() {
      return (
        <FormGroup {...this.getHolderProps()}>
          {this.getLeftTitle()}
          <div className="form__field-holder">
            <Field {...this.props} />
          </div>
          {this.getRightTitle()}
          {this.getDescription()}
        </FormGroup>
      );
    }

  }

  FieldHolder.propTypes = {
    leftTitle: React.PropTypes.any,
    rightTitle: React.PropTypes.any,
    title: React.PropTypes.any,
    extraClass: React.PropTypes.string,
    holderId: React.PropTypes.string,
    id: React.PropTypes.string,
    description: React.PropTypes.any,
    hideLabels: React.PropTypes.bool,
  };

  FieldHolder.defaultProps = {
    className: '',
    extraClass: '',
    leftTitle: null,
    rightTitle: null,
  };

  FieldHolder.defaultProps = {
    className: '',
    extraClass: '',
  };

  return FieldHolder;
}

export default fieldHolder;
