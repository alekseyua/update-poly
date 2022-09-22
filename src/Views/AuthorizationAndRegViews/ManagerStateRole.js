import React from 'react';
import AuthorizationAndRegViews from '../../Views/AuthorizationAndRegViews';
import { ROLE } from '../../const';

const ManagerStateRole = (props) => {
  const { setRole, setStep, setState, step, role, keysForms } = props;
  if (step === 0 && role === ROLE.UNREGISTRED) {
    return <AuthorizationAndRegViews.RegistrationSelectRole step={step} setState={setState} />;
  } else {
    return React.Children.map(props.children, (child) => {
      if (React.isValidElement(child)) {
    
        return React.cloneElement(child, {
          setStep: setStep,
          step: step,
          role: role,
        });
      } else {
        return null;
      }
    });
  }
};

export default React.memo(ManagerStateRole);
