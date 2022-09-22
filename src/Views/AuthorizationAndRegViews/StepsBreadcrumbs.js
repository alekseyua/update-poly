import React from 'react';
import Icon from '../Icon/Icon';
import { leftArrowIcon } from '../../images';
import Button from '../Button';
import style from './styles/stepsBreadcrumbs.module.scss';
import Text from '../../helpers/Text';

const StepsBreadcrumbs = ({ step = 0, allSteps = 1, setPrevStep }) => {
  return (
    <div className={style['stepsBreadcrumbs__wrapper']}>
      <Button onClick={()=>setPrevStep(step)} variant={'backForm'} className={style['stepsBreadcrumbs__wrapper-steps-btn']}>
        <Icon className={style['stepsBreadcrumbs__wrapper-steps-icon']} src={leftArrowIcon} slot={'icon-left'} />
        <Text text={'backTo'} />
      </Button>
      <span className={style['stepsBreadcrumbs__wrapper-steps-text']}>
        <Text text={'step'} />
        &nbsp; 0{step}/0{allSteps}
      </span>
    </div>
  );
};

export default React.memo(StepsBreadcrumbs);
