import React from 'react';
import CheckBox from '../../../CheckBox';
import Text from '../../../../helpers/Text';
import classNames from 'classnames';
import Button from '../../../Button';
import BlockSpinner from '../../../../Views/SpinnerWrapper';

import style from '../styles/addreview.module.scss';
import ToolTip from '../../../ToolTip';

const FormAddReviewController = ({ values, setFieldValue, canselationCallback, onChange, handleSubmit, productId, profileId }) => {
  return (
    <div className={style['productreviews__form-submit-wrappar']}>
      <CheckBox
        checked={!!values.iAgreeDataProcessing}
        onChange={(e) => {
          const value = e.checked;
          setFieldValue('iAgreeDataProcessing', !value);
          onChange(value)
        }}
        variant="input"
        label={Text({ text: 'iAgreeDataProcessing' })}
        data-cy={`CheckBoxReview`}
      />
      <div className={style['productreviews__form-submit-btnwrap']}>
        <ToolTip
          placement="bottom"
          slot={'icon-right'}
          className={style['productreviews__tooltip-send']}
          active = { !!values.content && !!values.stars}
          content={
            !profileId?
              'Чтобы полноценно воспользоваться всеми возможностями сотрудничества, необходимо пройти регистрацию'
                :!values.content? 'Вы не заполнили поле с отзывом'
                  : !values.stars? 
                    'Укажите пожалуйста рейтинг продукта, выделив звёзды'
                    : null
          }
        >
          <Button
            disabled={values.activeButton}
            data-cy={`send_review`}
            type="submit"
            className={classNames({
              [style['productreviews__form-submit-btndark']]: true,
            })}
            onClick={(e) => {
              setFieldValue('productId', productId)
              setFieldValue('profileId', profileId)
              e.preventDefault();
              handleSubmit()
            }}
          >
            <Text text={'send'} />
            {!values.activeButton && values.activeSpinner ? <BlockSpinner.Spinner sizeWidth='20' sizeHeight='20' slot={'icon-left'} bodrad={50} /> : null}
          </Button>
        </ToolTip>

        <Button
          onClick={(e) => {
            e.preventDefault();
            canselationCallback(e)
          }}
          className={style['productreviews__form-submit-btn']}
          data-cy={`cancel_form_review`}
        >
          <Text text={'clearlation'} />

        </Button>
      </div>
    </div>
  );
};

export default React.memo(FormAddReviewController);
