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
  label,
  countRaiting,
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
      label={label}
      countRaiting={countRaiting}
    />
  );
};

export default React.memo(RaitingContainer);
