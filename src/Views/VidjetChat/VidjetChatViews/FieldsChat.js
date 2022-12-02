import React from 'react';
import classNames from 'classnames';
import { Formik } from 'formik';
import { FaqSchema } from '../../../helpers/schemesFormic';
import ErrorField from '../../ErrorField';
import BlockSpinner from '../../SpinnerWrapper';
import Form from '../../Form';
import Input from '../../Input';
import Select from '../../Select';
import Button from '../../Button';
import TextArea from '../../TextArea';

import style from './styles/index.module.scss';
import Icon from '../../Icon';
import { spin } from '../../../images';

const FieldsChat = ({
  answers = [],
  options = [],
  submitQuestrion,
  successResponse,
}) => {

  return (
    <div className={style['widget__chat-field']}>
      <details className={style['widget__chat-details']}>
        <summary className={style['widget__chat-summary']}>
          <div className={style['widget__chat-button-text']}>Написать нам</div>
        </summary>
        <div
          className={classNames({
            [style['widget__chat-message-full']]: true,
            [style['widget__chat-message-user']]: true,
          })}
        >
          <div className={style['widget__chat-message-wrapper']}>
            <div className={style['widget__chat-message-name']}>Не нашли ответа на свой вопрос?</div>
          </div>
          <p className={style['widget__chat-message-text']}>
            Вы можете задать его в форме ниже, ответ придет на указанную почту.
          </p>
          <Formik
            enableReinitialize
            validationSchema={FaqSchema}
            initialValues={{
              name: '',
              email: '',
              category: null,
              question: '',
              spinnerBtn: false
            }}
            onSubmit={submitQuestrion}
          >
            {({ handleSubmit, values, touched, errors, setFieldValue, handleChange }) => {
              return (
                <Form novalidate onSubmit={handleSubmit}>
                  <div className={style['widget__form-wrap']}>
                    <Input
                      className={style['widget__form-input']}
                      value = { values.name }
                      name="name"
                      onChange={handleChange}
                      placeholder = { "ФИО" }
                      helpText = { 
                        errors.name && touched.name ? <ErrorField message={errors.name} /> : null
                      }
                    />
                    <Input
                      className={style['widget__form-input']}
                      value = { values.email}
                      type="email"
                      name={'email'}
                      onChange={handleChange}
                      placeholder="Электронная почта"
                      helpText = {
                        errors.email && touched.email ? <ErrorField message={errors.email} /> : null
                      }
                    />
                    <Select
                      name={'category'}
                      value = { values.category }
                      onClick={(e) => {
                        const value = e.target.getAttribute('value');
                        setFieldValue('category', value)
                      }}
                      className={'select-chat-answer'}
                      placeholder="Категория"
                      options = { options }
                      helpText = {
                        errors.category && touched.category ? (
                          <ErrorField message={errors.category} />
                        ) : null
                      }
                   />
                    <TextArea
                      name={'question'}
                      value = { values.question }
                      onChange={ handleChange }
                      className={ style['widget__form-input'] }
                      placeholder = "Напишите Ваш вопрос"
                      helpText={
                        errors.question && touched.question ? errors.question : null                        
                      }
                    />
                    <div className={style['widget__form-btn-wrap']}>
                      <Button 
                        disabled = { values.spinnerBtn }
                        type="button"  
                        variant="cabinet_default"
                      >
                        Отправить
                        { values.spinnerBtn? <Icon src = { spin } width = { '20' } height = { '20' } bodrad = {50} slot = { 'icon-right' } /> : null }
                      </Button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </details>

      {
        successResponse ? (
          <div
            className={classNames({
              [style['widget__chat-message-full']]: true,
              [style['widget__chat-message-user']]: true,
            })}
          >
            <p className={style['widget__chat-message-notify']}>
              Сообщение отправлено. Ответ придет на почту {successResponse}
            </p>
          </div>
        ) : null
      }
      {
        answers.length ?
          answers.map((el) => {

            return (
              <details
                key={el.id}
                className={style['widget__chat-details']}
              >
                <summary className={style['widget__chat-summary']}>
                  <div className={style['widget__chat-button-text']}>{el.question}</div>
                </summary>
                <div

                  className={classNames({
                    [style['widget__chat-message-full']]: true,
                    [style['widget__chat-message-admin']]: true,
                  })}
                >
                  <div className={style['widget__chat-message-wrapper']}>
                    <div className={style['widget__chat-message-name']}>{el.question}</div>
                  </div>
                  <p

                    className={style['widget__chat-message-text']}>{el.answer}</p>
                </div>
              </details>
            );
          })
          : <BlockSpinner.SpinnerCenter>
            <BlockSpinner.Spinner sizeHeight='25' sizeWidth='25' />
          </BlockSpinner.SpinnerCenter>
      }

    </div>
  );
};

export default React.memo(FieldsChat);
