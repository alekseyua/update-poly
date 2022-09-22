import React, { useState } from 'react';
import classNames from 'classnames';
import Text from '../../helpers/Text';
import style from './styles/index.module.scss';
import CheckBox from '../CheckBox';
import Input from '../Input';
import Button from '../Button';
import { ROLE } from '../../const';
import e from 'express';


const BrandsFilters = ({
  children,
  sercheHandler,
  resetFilter,
  setSertificate,
  sertificate,
  sercheValue,
  role,
  is_visibleViewAll,
}) => {
  const [viewAll, setViewAll] = useState(false);
  return (
    <div className={style['catfilter-block']}>
      <div className={style['catfilter-block__heading']}>
        <Text text={'brands'} />
      </div>
      <div className={style['catfilter-item']}>
        {role?.number === ROLE.WHOLESALE ? (
          <CheckBox
            onChange={(e) => {
              const value = e.checked;
              if (value === null) return;
              setSertificate(value);
            }}
            checked={sertificate}
            variant="light"
            label={Text({ text: 'only.sertificate' })}
            data-cy={`sertificateCheckBox`}
          ></CheckBox>
        ) : null}
      </div>
      <div className={style['catfilter-block__content']}>
        <div className={style['catfilter-search']}>
          <Input
            value={sercheValue}
            onChange={sercheHandler}
            label={''}
            placeholder={`${Text({ text: 'search' })}...`}
            variant="light"
            data-cy={`brandSearch`}
          ></Input>
        </div>
        <div className={style['catfilter-scrollwrap']}>
          <div
            className={classNames({
              [style['catfilter-scroll']]: true,
              [style['active']]: viewAll,
            })}
          >

            {children}

          </div>
        </div>
      </div>
      <div className={style['catfilter-block__bottom']}>
        {is_visibleViewAll ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              setViewAll(!viewAll);
            }}
            datanoClick={'noClick'}
            variant="text"
            data-cy={`catfilterBrandsButton`}
            className={style['catfilter-block__toggle']}
          >
            <Text text={viewAll ? 'hide' : 'views.all'} />
          </Button>
        ) : (
          <div></div>
        )}

        <Button
          onClick={(e) =>resetFilter(e)}
          data-noClick={'noClick'}
          variant="text"
          className={style['catfilter-block__reset']}
          data-cy={`catfilterBrandsButtonReset`}
        >
          <Text text={'reset'} />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(BrandsFilters);
