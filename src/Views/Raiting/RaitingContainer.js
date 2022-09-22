import React from 'react';
import Raiting from './RaitingView';


const RaitingContainer = ({
  disabled,
  removeFocus = () => {},
  setFocus = () => {},
  onChange = () => {},
  getSymbol,
  max,
  precision,
  readonly,
  value,
}) => {
  return (
    <Raiting
      disabled={disabled}
      // removeFocus={removeFocus}
      // setFocus={setFocus}
      onChange={onChange}
      max={max}
      precision={precision}
      readonly={readonly}
      ActiveStar={value}
    />
  );
};

export default React.memo(RaitingContainer);
