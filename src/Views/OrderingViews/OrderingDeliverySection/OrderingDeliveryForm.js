import React from 'react';
import CheckBox from '../../CheckBox';
import { successIcon } from '../../../images';
import classNames from 'classnames';

import style from '../styles/index.module.scss';
import Icon from '../../Icon';

const OrderingDeliveryForm = ({
  lastname,
  firstname,
  patronomic,
  serias_and_number_passport,
  issued_passport,
  issued_date,
  comment,
  agree_personal_data,
  setFieldValue,
  errors = {},
  touched,
}) => {
  return (
    <>
      {/* Форма ниже только для розницы/дропа.
          Скрывается при нажатии на кнопку "Дождаться звонка" */}
      <div className={style['ordering__delivery-form']}>
        <h3 className={style['ordering__delivery-form-head']}>Заполнить данные сейчас</h3>
        <div className={style['ordering__delivery-form-wrap']}>
          <div className={style['ordering__delivery-form-left']}>
            <h4 className={style['ordering__delivery-form-subhead']}>ФИО</h4>
            {/* Так будет выглядеть правильно заполненное поле */}
            <Input
              label="Фамилия"
              value={lastname}
              name={'lastname'}
              onGx-change={(e) => {
                setFieldValue('lastname', e.target.value);
              }}
              className={classNames({
                [style['ordering__delivery-form-input']]: true,
                [style['ordering__delivery-form-input--success']]: !errors.lastname && lastname,
              })}
              placeholder="Введите фамилию"
            >
              {errors.lastname && touched.lastname ? (
                <div
                  slot="help-text"
                  className={classNames({
                    [style['ordering__delivery-form-input-slot--visible']]: errors.lastname,
                    [style['ordering__delivery-form-input-slot--hidden']]: !errors.lastname,
                  })}
                >
                  Неправильно указана фамилия
                </div>
              ) : null}

              <Icon
                src={successIcon}
                slot="suffix"
                height={20} 
                width={20}
                className={
                  !errors.lastname && lastname
                    ? style['ordering__delivery-form-input-icon--visible']
                    : style['ordering__delivery-form-input-icon--hidden']
                }
                // "ordering__delivery-form_input_icon-hidden"
              />
              {/* Иконка появляется при прохождении валидации */}
            </Input>
            {/* А так выглядит неправильно заполненное */}
            <Input
              label="Имя"
              className={classNames({
                [style['ordering__delivery-form-input']]: true,
                [style['ordering__delivery-form-input--success']]: !errors.firstname && firstname,
              })}
              placeholder="Введите имя"
              onGx-change={(e) => {
                setFieldValue('firstname', e.target.value);
              }}
              value={firstname}
              name={'firstname'}
            >
              {errors.firstname && touched.firstname ? (
                <div
                  slot="help-text"
                  className={classNames({
                    [style['ordering__delivery-form-input-slot--visible']]: errors.firstname,
                    [style['ordering__delivery-form-input-slot--hidden']]: !errors.firstname,
                  })}
                  // при непройденной валидации класс "ordering__delivery-form_input_slot-visible"
                  // по умолчанию "ordering__delivery-form_input_slot-hidden"
                >
                  Неправильно указано имя
                </div>
              ) : null}

              <Icon
                src={successIcon}
                slot="suffix"
                height={20} 
                width={20}
                className={
                  !errors.firstname && firstname
                    ? style['ordering__delivery-form-input-icon--visible']
                    : style['ordering__delivery-form-input-icon--hidden']
                }
              />
            </Input>
            <Input
              label="Отчество"
              className={classNames({
                [style['ordering__delivery-form-input']]: true,
                [style['ordering__delivery-form-input--success']]: !errors.patronomic && patronomic,
              })}
              placeholder="Введите отчество"
              onGx-change={(e) => {
                setFieldValue('patronomic', e.target.value);
              }}
              value={patronomic}
              name={'patronomic'}
            >
              {errors.patronomic && touched.patronomic ? (
                <div
                  slot="help-text"
                  className={classNames({
                    [style['ordering__delivery-form-input-slot--visible']]: errors.patronomic,
                    [style['ordering__delivery-form-input-slot--hidden']]: !errors.patronomic,
                  })}
                >
                  Неправильно указано отчество
                </div>
              ) : null}

              <Icon
                src={successIcon}
                slot="suffix"
                height={20} 
                width={20}
                className={
                  !errors.patronomic && patronomic
                    ? style['ordering__delivery-form-input-icon--visible']
                    : style['ordering__delivery-form-input-icon--hidden']
                }
              />
            </Input>
          </div>
          <div className={style['ordering__delivery-form-right']}>
            <h4 className={style['ordering__delivery-form-subhead']}>паспортные данные</h4>
            <Input
              label="Серия и номер паспорта"
              className={classNames({
                [style['ordering__delivery-form-input']]: true,
                [style['ordering__delivery-form-input--success']]:
                  !errors.serias_and_number_passport && serias_and_number_passport,
              })}
              placeholder="Введите серию и номер паспорта"
              onChange={(e) => {
                setFieldValue('serias_and_number_passport', e.target.value);
              }}
              value={serias_and_number_passport}
              name={'serias_and_number_passport'}
            >
              {errors.serias_and_number_passport && touched.serias_and_number_passport ? (
                <div
                  slot="help-text"
                  className={classNames({
                    [style['ordering__delivery-form-input-slot--visible']]:
                      errors.serias_and_number_passport,
                    [style['ordering__delivery-form-input-slot--hidden']]:
                      !errors.serias_and_number_passport,
                  })}
                >
                  Неправильно указан номер
                </div>
              ) : null}

              <Icon
                src={successIcon}
                slot="suffix"
                height={20} 
                width={20}
                className={
                  !errors.serias_and_number_passport && serias_and_number_passport
                    ? style['ordering__delivery-form-input-icon--visible']
                    : style['ordering__delivery-form-input-icon--hidden']
                }
              />
            </Input>
            <Input
              label="Паспорт выдан"
              className={classNames({
                [style['ordering__delivery-form-input']]: true,
                [style['ordering__delivery-form-input--success']]:
                  !errors.issued_passport && issued_passport,
              })}
              placeholder="Паспорт выдан"
              onGx-change={(e) => {
                setFieldValue('issued_passport', e.target.value);
              }}
              value={issued_passport}
              name={'issued_passport'}
            >
              {errors.issued_passport && touched.issued_passport ? (
                <div
                  slot="help-text"
                  className={classNames({
                    [style['ordering__delivery-form-input-slot--visible']]: errors.issued_passport,
                    [style['ordering__delivery-form-input-slot--hidden']]: !errors.issued_passport,
                  })}
                >
                  Неправильно указан номер
                  {/* Не знаю что в ошибку написать */}
                </div>
              ) : null}

              <Icon
                src={successIcon}
                slot="suffix"
                height={20} 
                width={20}
                className={
                  !errors.issued_passport && issued_passport
                    ? style['ordering__delivery-form-input-icon--visible']
                    : style['ordering__delivery-form-input-icon--hidden']
                }
              />
            </Input>
            <Input
              label="Дата выдачи"
              className={classNames({
                [style['ordering__delivery-form-input']]: true,
                [style['ordering__delivery-form-input--success']]:
                  !errors.issued_date && issued_date,
              })}
              placeholder="ДД.ММ.ГГГГ"
              onGx-change={(e) => {
                setFieldValue('issued_date', e.target.value);
              }}
              type={'date'}
              value={issued_date}
              name={'issued_date'}
            >
              {errors.issued_date && touched.issued_date ? (
                <div
                  slot="help-text"
                  className={classNames({
                    [style['ordering__delivery-form-input-slot--visible']]: errors.issued_date,
                    [style['ordering__delivery-form-input-slot--hidden']]: !errors.issued_date,
                  })}
                >
                  Неправильно указана дата выдачи
                </div>
              ) : null}

              <Icon
                src={successIcon}
                slot="suffix"
                height={20} 
                width={20}
                className={classNames({
                  [style['ordering__delivery-form-input-icon--visible']]:
                    !errors.issued_date && issued_date,
                  [style['ordering__delivery-form-input-icon--hidden']]:
                    errors.issued_date || !issued_date,
                })}
              />
            </Input>
          </div>
        </div>
        <h4 className={style['ordering__delivery-form-subhead']}>Комментарий</h4>
        <textarea
          onChange={(e) => {
            setFieldValue('comment', e.target.value);
          }}
          value={comment}
          name={'comment'}
          placeholder="Напишите"
          className={style['ordering__delivery-form-textarea']}
        />
        <CheckBox
          checked={agree_personal_data}
          onChange={(e) => {
            setFieldValue('agree_personal_data', !e.checked);
          }}
          label="Соглашаюсь на обработку персональных данных"
        />
      </div>
    </>
  );
};

export default React.memo(OrderingDeliveryForm);
