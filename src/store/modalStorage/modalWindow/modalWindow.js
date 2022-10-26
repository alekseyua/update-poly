import { Formik } from "formik";
import * as React from "react";
import Phone from 'react-phone-number-input'
import api from "../../../api/api";
import { ROLE } from "../../../const";
import { changeAddAddressSchema, changePhoneSchema, feedbackSheme, GetMyCacheModalContentShema, payModalScheme } from "../../../helpers/schemesFormic";
import Button from "../../../Views/Button";
import Error from "../../../Views/Error";
import ErrorField from "../../../Views/ErrorField";
import Form from "../../../Views/Form";
import BlockGrid from '../../../Views/GridContainerBlock';
import Input from "../../../Views/Input";
import AddToCart from "../../../Views/ModalProvider/ModalAddToCart";
import Offset from "../../../Views/Offset";
import Select from "../../../Views/Select";
import TextArea from "../../../Views/TextArea";
import Title from "../../../Views/Title";
import WarningBlock from "../../../Views/WarningBlock";
import ModalChooseOrderInList from '../../../Views/ModalProvider/ModalChooseOrderInList';
import Text from "../../../helpers/Text";
import SubTitle from "../../../Views/InformationViews/HowTo/SubTitle";
import InfoBalanse from "../../../Views/InfoBalance/InfoBalanse";
import AddUploadFiles from "../../../Views/AddFiles";
import { errorAlertIcon, spin, spinnerCart2, successAlertIcon } from "../../../images";
import TextUnderTitle from "../../../Views/TextUnderTitle";
import BlockSpinner from '../../../Views/SpinnerWrapper';

const contentApi = api.contentApi;
const orderApi = api.orderApi;

export const textSuccessMessage = (text) => {
  return (
    <BlockGrid.Container>
      <BlockGrid.BlockMessage>
        {text}
      </BlockGrid.BlockMessage>
    </BlockGrid.Container>
  )
}

export const textErrorMessage = (error) => {
  return (
    <BlockGrid.Container>
      <BlockGrid.BlockMessage>
        {error.map((el, i) => <p key={`error-${i}`}> {el} </p>)}
      </BlockGrid.BlockMessage>
    </BlockGrid.Container>
  )
}
export const feedback = async (onSubmit, dispatch, fullName, email, closeModalState) => {
  try {
    const res = await contentApi.getProblemArea();
    const optionsProblemArea = await res.map((el) => {
      return {
        value: el.id,
        title: el.problem_area,
      };
    })
    return (
      <Formik
        enableReinitialize
        validationSchema={feedbackSheme()}
        initialValues={{
          problem_area: '',
          name: fullName,
          email: email,
          message: '',
          files: null,
          activeButton: true
        }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, setFieldValue, touched }) => {
          console.log({values})
          return (
            <Form onSubmit={handleSubmit} >
              <BlockGrid.Container>
                <Title mb={'40px'} title={'Форма обратной связи'} />
                <WarningBlock
                  textWarning={'В случае возниконовения вопросов Вы можете свызаться с нами с помощью формы ниже. Ответ по Вашему обращению Вы получите в течении 3х рабочих дней на указанный почтовый адрес'}
                />
                <BlockGrid.BlockFeedback>
                  <Select
                    autocomplete={'off'}
                    placeholder={'Выбирете раздел'}
                    variant={'select-feedback'}
                    name={'problem_area'}
                    value={values.problem_area}
                    onClick={e => {
                      setFieldValue('problem_area', e.target.getAttribute('value'))
                    }}
                    label={'Тематика обращения'}
                    options={optionsProblemArea}
                    helpText={errors.problem_area && touched.problem_area ? <ErrorField message={errors.problem_area} /> : null}
                  />
                  <Input
                    className={'input-mt_20'}
                    value={values.name}
                    variant={'largeCustomLabel'}
                    name={'name'}
                    onChange={handleChange}
                    data-cy={'registration_first_name'}
                    autocomplete={'off'}
                    autofocus
                    label={'Как к Вам обращаться'}
                    placeholder={'Введите Ваше Имя'}
                    onBlur={handleBlur}
                    helpText={errors.name && touched.name ? <ErrorField message={errors.name} /> : null}
                  />
                  <Input
                    className={'input-mt_20'}
                    value={values.email}
                    variant={'largeCustomLabel'}
                    name={'email'}
                    autofocus
                    onChange={handleChange}
                    data-cy={'registration_first_name'}
                    autocomplete={'off'}
                    label={'Адрес эл.почты'}
                    placeholder={'Введите Ваш email'}
                    onBlur={handleBlur}
                    helpText={errors.email && touched.email ? <ErrorField message={errors.email} /> : null}
                  />
                  <TextArea
                    value={values.message}
                    name={'message'}
                    onChange={(e) => {
                      setFieldValue('activeButton', false)
                      handleChange(e)
                    }}
                    placeholder={'Напишите Ваш вопрос'}
                    label={'Описание'}
                    className={'feedback__textarea'}
                    onBlur={handleBlur}
                    helpText={errors.message && touched.message ? <Error message={errors.message} /> : null}
                  ></TextArea>

                  <Offset offset={'content'} />

                  <AddUploadFiles
                    name={'files'}
                    type={'file'}
                    className={'wrapperBtnFile'}
                    label={'Прикрепить изображение:'}
                    accept={'.png, .jpg, .jpeg, .mp4'}
                    onBlur={handleBlur}
                    multiple={null}
                    setFieldValue={setFieldValue}
                  />

                  {errors.files ? <ErrorField message={errors.files} /> : null}

                  <Offset offset={'content'} />
                  <Button
                    type={'submit'}
                    full
                    variant={'black_btn_full_width'}
                    disabled={values.activeButton}
                    handleBlur={handleBlur}
                  >
                    отправить
                  </Button>
                </BlockGrid.BlockFeedback>
              </BlockGrid.Container>
            </Form>
          );
        }}
      </Formik>
    )
  } catch (err) {
    console.log('ERROR GET FEEDBACK', err)
    let error = [Text({ text: 'error-on-server' })];
    if (err?.data) {
      const errors = err.data;
      if (typeof errors !== 'object') {
        error.push(`${errors}`)
      } else {
        error.push(`${errors[0]}`)
      }
    }
    dispatch('setModalState', {
      show: true,
      content: textErrorMessage(error),
      iconImage: errorAlertIcon,
      addClass: 'modal-alert-error',
      action: {
        title: ['продолжить', null]
      },
      onClick: closeModalState
    })
  }
}

export const addToCart = (
  product_rcAmount,
  is_collection,
  product_rc,
  old_price,
  currency,
  color,
  price,
  image,
  title,
  sise,
  role,
) => {
  return (
    <AddToCart.AddToCartWrapper>
      <Title
        type='h1'
        fontSize={'25px'}
        textAlign={'center'}
      >
        Добавлено в корзину
      </Title>
      <AddToCart.AddToCartContainer>

        <AddToCart.AddToCartDescription>

          <AddToCart.AddToCartDescriptionImage
            image={image}
          />

          <AddToCart.AddToCartDescriptionContent>
            <AddToCart.AddToCartDescriptionContentTitle
              title={title}
            />
            {
              role === ROLE.RETAIL || role === ROLE.DROPSHIPPER ?
                <React.Fragment>
                  <AddToCart.AddToCartDescriptionContentSize
                    size={sise}
                  />
                  <AddToCart.AddToCartDescriptionContentColor
                    color={color}
                  />
                </React.Fragment>
                : <AddToCart.AddToCartDescriptionContentProductRc
                  product_rc={product_rc}
                />
            }
          </AddToCart.AddToCartDescriptionContent>

        </AddToCart.AddToCartDescription>

        <AddToCart.AddToCartPriceContainer>
          {
            old_price ?
              <AddToCart.AddToCartPriceDiscount
                currency={currency}
                old_price={old_price}
              />
              : null
          }

          {
            price ?
              <AddToCart.AddToCartPrice
                price={price}
                currency={currency}
              />
              : null
          }

          {
            role === ROLE.WHOLESALE && is_collection ?
              <AddToCart.AddToCartPriceCollection
                price={price}
                product_rcAmount={product_rcAmount}
                currency={currency}
              />
              : null
          }

        </AddToCart.AddToCartPriceContainer>

      </AddToCart.AddToCartContainer>
    </AddToCart.AddToCartWrapper>
  )
}

export const listCurrentOrders = (listOrders, changeStatusOrder, currency) => {

  let newListRes = listOrders.filter(el => el.status?.status === 'in_process' || el.status?.status === 'payment_waiting' || el.status?.status === 'redeemed');
  const options = newListRes.map((el) => {
    return {
      title: `${el.order_number} (${el.total} ${currency})`,
      value: el.id,
    };
  });
  options.push({
    title: !!newListRes.length ? 'Отменить выбор' : 'Нет доступных заказов',
    value: null,
  });


  return (
    <ModalChooseOrderInList.ModalChooseOrderInListContainer>

      <Select
        autoFocus
        variant={'select-theme__black'}
        onClick={(e) => {
          const value = e.target.getAttribute('value');
          changeStatusOrder(value)
        }}
        options={options}
        placeholder={'Сделайте Ваш выбор'}
      ></Select>
    </ModalChooseOrderInList.ModalChooseOrderInListContainer>
  )
}

export const payment = async (order_id, balance, total_price, currency, first_name, last_name, middle_name, dispatch, redirectTo, closeModalState) => {
  const initialValues = {
    fio: (middle_name && first_name && last_name) ?
      `${first_name} ${last_name} ${middle_name}`
      : (first_name && last_name) ?
        `${first_name} ${last_name}`
        : first_name ?
          `${first_name}`
          : '',
    cost: 0,
    comment: '',
    receipt: null,
    order_id: order_id ? order_id : null,
    activeButton: true,
    activeSpinner: false
  };
  const errorsMessenge = {
    symbol: 'Поле не должно содержать спец. символы',
    requiredField: Text({ text: 'requiredField' }),
    requiredNotCountMony: 'Необходимо указать сумму платежа',
    shortComments: Text({ text: 'short.comments' }),
    longComments: Text({ text: 'long.comments' }),
    receipt: "файл не добавлен"
  };
  try {

    const requisites = await orderApi.getRandomRequizites();
    const sendCheckToServer = async (data, { setFieldError, setFieldValue }) => {
      try {
        setFieldValue('activeSpinner', true)
        const fdPayments = new FormData();
        fdPayments.set('requisites_id', requisites.id);
        !!data.order_id ? fdPayments.set('order_id', data.order_id) : null;
        fdPayments.set('cost', data.cost);
        fdPayments.set('name', data.fio);
        fdPayments.set('comment', data.comment);

        if (data.receipt === null) {
          setFieldError('receipt', 'Вы не приложили квитанцию об оплате')
        } else {
          fdPayments.set('receipt', data?.receipt[0]);
          const resCreatePayment = await orderApi.createPayments(fdPayments)
          debugger
          if (!order_id) return closeModalState();
          redirectTo ? redirectTo('/orders') : null;
        }
      } catch (err) {

        console.log('ERROR IN CREATE PAYMENT', err)
        let error = [Text({ text: 'error-on-server' })];
        const data = err?.data;
        if (!!data) {
          for (const key in data) {
            const element = Array.isArray(data[key]) ? data[key][0] : data[key];
            if (initialValues.hasOwnProperty(key)) {
              setFieldError(key, element)
            }
          }
        } else {
          dispatch('setModalState', {
            show: true,
            content: textErrorMessage(error),
            iconImage: errorAlertIcon,
            action: {
              title: ['Продолжить', null]
            },
            onClick: () => redirectTo('/balance'), //closeModalState()
            closeModal: () => redirectTo('/balance')
          })
        }
      }
    }

    return (
      <Formik
        validationSchema={payModalScheme(errorsMessenge)}
        initialValues={initialValues}
        onSubmit={sendCheckToServer}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, setFieldValue, touched }) => {

          return (
            <Form onSubmit={handleSubmit}>
              <BlockGrid.Container>
                {
                  total_price ?
                    <InfoBalanse
                      total_price={total_price}
                      now_balance={balance}
                      currency={currency}
                    />
                    : null
                }
                <SubTitle>Реквизиты для пополнения баланса</SubTitle>
                <WarningBlock
                  textWarning={<div dangerouslySetInnerHTML={{ __html: requisites.requisites }}></div>}
                />
                <BlockGrid.BlockPayment>
                  <Input
                    value={values.cost}
                    type={'number'}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'cost'}
                    autofocus
                    autocomplete={'off'}
                    onChange = { (e) => { 
                      values.cost && values.fio && values.recient? setFieldValue( 'activeButton', false ) : null;
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    helpText={errors.cost && touched.cost ? <ErrorField message={errors.cost} /> : null}
                    label={'Сумма к зачислению*'}
                  />
                  <Input
                    value={values.fio}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'fio'}
                    autocomplete={'off'}
                    onChange = { (e) => { 
                      values.cost && values.fio && values.recient? setFieldValue( 'activeButton', false ) : null;
                      handleChange(e);
                    }}
                    autofocus
                    onBlur={handleBlur}
                    helpText={errors.fio && touched.fio ? <ErrorField message={errors.fio} /> : null}
                    label={'ФИО отправителя*'}
                  />
                  <Input
                    value={values.comment}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'comment'}
                    autocomplete={'off'}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helpText={
                      errors.comment && touched.comment ? <ErrorField message={errors.comment} /> : null
                    }
                    label={'Комментарий'}
                  />
                  {/* <ModalContentViews.FileInputCustom
                  /> */}
                  <AddUploadFiles
                    label={'Прикрепить чек:'}
                    accept={'.png, .jpg, .jpeg, .mp4'}
                    onBlur={handleBlur}
                    multiple={null}
                    name={'receipt'}
                    setFieldValue={setFieldValue}
                    onChange = { (e) => { 
                      values.cost && values.fio && e.currentTarget.files? setFieldValue( 'activeButton', false ) : null;
                    }}
                  />
                  {errors.receipt && touched ? <Error message={errors.receipt} /> : null}

                  <Button
                    disabled = { values.activeButton }
                    type={'submit'}
                    full
                    variant={'black_btn_full_width'}
                  >
                    ОПЛАТИТЬ
                    { !values.activeButton && values.activeSpinner ? <BlockSpinner.Spinner sizeWidth='20' sizeHeight='20' slot={'icon-left'} bodrad = { 50 }/> : null }
                  </Button>
                </BlockGrid.BlockPayment>

              </BlockGrid.Container>
            </Form>
          );
        }}
      </Formik>
    )
  } catch (err) {
    console.log('ERROR IN CREATE PAYMENT', err)
    let error = [Text({ text: 'error-on-server' })];
    if (err?.data) {
      const errors = err.data;
      if (typeof errors !== 'object') {
        error.push(`${errors}`)
      } else {
        error.push(`${errors[0]}`)
      }
    }
    dispatch('setModalState', {
      show: true,
      content: textErrorMessage(error),
      iconImage: errorAlertIcon,
      addClass: 'modal-alert-error',
      action: {
        title: ['продолжить', null]
      },
      onClick: () => closeModalState()
    })
  }
}

export const addAddressForPost = async (currency, first_name, last_name, middle_name, phone, email, dispatch, closeModalState, typeModal, profileId, context, idAddress) => {
  try {
    const resCountry = await orderApi.getCountry();
    const countryOptions = resCountry.map((el) => {
      return {
        value: el.id,
        title: el.title,
      };
    })

    let defaultParamsInitData = {
      city: '',
      country: '',
      first_name: '',
      flat: '',
      id: idAddress ? idAddress : null,
      last_name: '',
      middle_name: '',
      phone: '',
      post_code: '',
      profile: profileId ? profileId : null,
      street: '',
      house: '',
      typeModal: typeModal ? typeModal : 'create',
      profileId: profileId,
      disableNext: true
    };

    if (typeModal === 'change') {
      const dataAddress = context.init_state.order.addressDilivery.results.filter(el => el.id === idAddress)[0];
      defaultParamsInitData = {
        city: dataAddress.city,
        country: dataAddress.country,
        first_name: dataAddress.first_name,
        flat: dataAddress.flat,
        id: dataAddress.id,
        last_name: dataAddress.last_name,
        middle_name: dataAddress.middle_name,
        phone: dataAddress.phone,
        post_code: dataAddress.post_code,
        profile: dataAddress.profile,
        street: dataAddress.street,
        house: dataAddress.house,
        typeModal: typeModal ? typeModal : 'create',
      };
    }

    const errorsMessenge = {
      shortlastname: Text({ text: 'short.last.name' }),
      longLastName: Text({ text: 'longLastName' }),
      requiredField: Text({ text: 'requiredField' }),
      longfirst_name: Text({ text: 'long.first.name' }),
      longPatronymic: Text({ text: 'long.patronymic' }),
      phone: Text({ text: 'invalid.phone' }),
      postcode: Text({ text: 'invalid.postcode' }),
      maxLengthField: Text({ text: 'max.length.field20' }),
      minLengthField: Text({ text: 'min.length.field5' }),
    };

    const createAddress = async (data, setFieldError) => {
      try {
        if (!!!data.middle_name) delete data['middle_name'];
        const resCreateAddress = await orderApi.postOrderAddressDeliviry(data, data.profileId)

        const newContext = {
          ...context,
          "init_state": {
            ...context.init_state,
            order: {
              addressDilivery: {
                ...context.init_state.order.addressDilivery,
                count: context.init_state.order.addressDilivery.count + 1,
                results: [resCreateAddress.data, ...context.init_state.order.addressDilivery.results]
              }
            }
          }
        }
        dispatch('context', newContext)
        closeModalState();
      } catch (err) {
        console.log('ERROR createAddress', err)
        if (!!err?.data) {
          const { data } = err;
          for (let key in data) {
            const element = data[key];
            setFieldError(key, element);
          }
        }
      }
    };

    const updateAddress = async (data, setFieldError) => {
      try {

        const resUpdateAddress = await orderApi.putByIdOrderAddressDeliviry(data.id, data)

        const country = countryOptions.filter(el => +el.value === +data.country)[0];
        if (country) {
          resUpdateAddress.data = {
            ...resUpdateAddress.data,
            country: country.title
          }
        }
        const changeDataAddressInMassive = context.init_state.order.addressDilivery.results.map(el => el.id === data.id ? resUpdateAddress.data : el);

        const newContext = {
          ...context,
          "init_state": {
            ...context.init_state,
            order: {
              addressDilivery: {
                ...context.init_state.order.addressDilivery,
                results: changeDataAddressInMassive
              }
            }
          }
        }
        dispatch('context', newContext)
        closeModalState();

      } catch (err) {
        console.error(`ERROR updateAddress`, err)
        if (!!err?.data) {
          const { data } = err;
          for (let key in data) {
            const element = data[key];
            setFieldError(key, element);
          }
        }
      }
    };

    const onSubmit = (data, { setFieldError }) => {

      if (data.typeModal === 'create') {
        return createAddress(data, setFieldError);
      } else if (data.typeModal === 'change') {
        return updateAddress(data, setFieldError);
      }
    };

    const openModalFeedback = () => {
      dispatch('feedback')
    }



    return (
      <Formik
        validationSchema={changeAddAddressSchema(errorsMessenge)}
        initialValues={defaultParamsInitData}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue, handleBlur, touched }) => {

          let enadledNext = true
          if (!!values.city && !!values.country && !!values.first_name && !!values.last_name && !!values.phone && !!values.post_code && !!values.street && !!values.house) {
            enadledNext = false
          } else {
            enadledNext = true
          }

          return (
            <Form onSubmit={handleSubmit}>
              <BlockGrid.Container>
                <TextUnderTitle>
                  <BlockGrid.BlockAddAddressAdditionalInfo>
                    Если Вашей страны нет в списке, просьба создать запрос на добавление страны через
                    <span
                      onClick={openModalFeedback}
                    >
                      окно обратной связи
                    </span>
                  </BlockGrid.BlockAddAddressAdditionalInfo>
                </TextUnderTitle>
                <BlockGrid.BlockAddAddressContainer>
                  <BlockGrid.BlockAddAddressLeftSide>

                    <BlockGrid.BlockAddAddressCell>
                      <Input
                        value={values.last_name}
                        name={'last_name'}
                        autofocus
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.last_name && touched.last_name ? 'error' : ''}
                        helpText={
                          !!errors.last_name && touched.last_name ? (
                            <ErrorField message={errors.last_name} />
                          ) : null
                        }
                        label={Text({ text: 'lastname' })}
                        placeholder={Text({ text: 'enterLastName' })}
                        data-cy={'modal_add_address_lastname'}
                      />
                    </BlockGrid.BlockAddAddressCell>

                    <BlockGrid.BlockAddAddressCell>
                      <Input
                        value={values.first_name}
                        name={'first_name'}
                        autofocus
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.first_name && touched.first_name ? 'error' : ''}
                        helpText={errors.first_name && touched.first_name ? <ErrorField message={errors.first_name} /> : null}
                        label={Text({ text: 'firstname' })}
                        placeholder={Text({ text: 'enterFirstName' })}
                        data-cy={'modal_add_address_firstname'}
                      />
                    </BlockGrid.BlockAddAddressCell>

                    <BlockGrid.BlockAddAddressCell>
                      <Input
                        value={values.middle_name}
                        name={'middle_name'}
                        autofocus
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.middle_name && touched.middle_name ? 'error' : ''}
                        helpText={errors.middle_name && touched.middle_name ? <ErrorField message={errors.middle_name} /> : null}
                        label={Text({ text: 'patronymic' })}
                        placeholder={Text({ text: 'enterPatronymic' })}
                        data-cy={'modal_add_address_patronymic'}
                      />
                    </BlockGrid.BlockAddAddressCell>

                    <BlockGrid.BlockAddAddressCell>
                      {/* <Input
                        variant={'varian-input'}
                        value={values.phone}
                        name={'phone'}
                        autofocus
                        onBlur={handleBlur}
                        placeholder={Text({ text: 'enterPhone' })}
                        autocomplete={'off'}
                        label={Text({ text: 'mobPhone' })}
                        onChange={handleChange}
                        className={errors.phone && touched.phone ? 'error' : ''}
                        /> */}


                      <BlockGrid.BlockAddAddressContainerPhone
                        helpText={errors.phone && touched.phone ? <ErrorField message={errors.phone} /> : null}
                      >
                        <Phone
                          placeholder={Text({ text: 'enterPhone' })}
                          value={values.phone}
                          name={'phone'}
                          defaultCountry={'RU'}
                          smartCaret={true}
                          limitMaxLength={true}
                          focusInputOnCountrySelection={true}
                          className={'form-input-number-phone-lk'}
                          onChange={phone => {
                            setFieldValue('phone', phone)
                          }}
                        />

                      </BlockGrid.BlockAddAddressContainerPhone>

                    </BlockGrid.BlockAddAddressCell>

                  </BlockGrid.BlockAddAddressLeftSide>

                  <BlockGrid.BlockAddAddressRightSide>
                    <BlockGrid.BlockAddAddressCell>
                      <Select
                        className={'select-addAddress'}
                        value={values.country}
                        autofocus
                        onBlur={handleBlur}
                        variant={'largeCustomLabel'}
                        name={'country'}
                        placeholder={Text({ text: 'enter.country' })}
                        label={Text({ text: 'country' })}
                        onClick={e => {
                          setFieldValue('country', e.target.getAttribute('value'))
                        }}
                        options={countryOptions}
                        helpText={errors.country && touched.country ? <ErrorField slot={'help-text'} message={errors.country} /> : null}
                      />
                    </BlockGrid.BlockAddAddressCell>

                    <BlockGrid.BlockAddAddressCell>
                      <Input
                        value={values.post_code}
                        name={'post_code'}
                        autofocus
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.post_code && touched.post_code ? 'error' : ''}
                        helpText={errors.post_code && touched.post_code ? <ErrorField message={errors.post_code} /> : null}
                        label={Text({ text: 'postcode' })}
                        placeholder={Text({ text: 'enter.postcode' })}
                      />
                    </BlockGrid.BlockAddAddressCell>

                    <BlockGrid.BlockAddAddressCell>
                      <Input
                        value={values.city}
                        name={'city'}
                        onChange={handleChange}
                        autofocus
                        onBlur={handleBlur}
                        className={errors.city && touched.city ? 'error' : ''}
                        helpText={errors.city && touched.city ? <ErrorField message={errors.city} /> : null}
                        label={Text({ text: 'city' })}
                        placeholder={Text({ text: 'enter.city' })}
                      />
                    </BlockGrid.BlockAddAddressCell>

                    <BlockGrid.BlockAddAddressCell>
                      <Input
                        value={values.street}
                        name={'street'}
                        onChange={handleChange}
                        autofocus
                        onBlur={handleBlur}
                        className={errors.street && touched.street ? 'error' : ''}
                        helpText={
                          errors.street && touched.street ? (
                            <ErrorField message={errors.street} />
                          ) : null
                        }
                        label={Text({ text: 'street' })}
                        placeholder={Text({ text: 'enter.street' })}
                      />
                    </BlockGrid.BlockAddAddressCell>

                    <BlockGrid.BlockAddAddressCell variant={'container'} >

                      <BlockGrid.BlockAddAddressCell>
                        <Input
                          value={values.house}
                          name={'house'}
                          onChange={handleChange}
                          autofocus
                          onBlur={handleBlur}
                          className={errors.house && touched.house ? 'error' : ''}
                          helpText={errors.house && touched.house ? <ErrorField message={errors.house} /> : null}
                          label={Text({ text: 'house.number' })}
                          placeholder={Text({ text: 'enter.house.number' })}
                        />
                      </BlockGrid.BlockAddAddressCell>

                      <BlockGrid.BlockAddAddressCell>
                        <Input
                          value={values.flat}
                          name={'flat'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autofocus
                          className={
                            errors.flat && touched.flat ? 'error' : ''
                          }
                          helpText={
                            errors.flat && touched.flat ? (
                              <ErrorField message={errors.flat} />
                            ) : null
                          }
                          label={Text({ text: 'apartament.number' })}
                          placeholder={Text({ text: 'enter.apartaments.number' })}
                        />
                      </BlockGrid.BlockAddAddressCell>

                    </BlockGrid.BlockAddAddressCell>

                  </BlockGrid.BlockAddAddressRightSide>

                </BlockGrid.BlockAddAddressContainer>
                {
                  errors.message_button ? (
                    <Error message={errors.message_button} />
                  ) : null
                }
                {
                  errors[0] ? (
                    <Error message={errors[0]} />
                  ) : null
                }
                <BlockGrid.BlockAddAddressContainerButton>
                  <Button
                    variant={'catalog-link-transparent__modal'}
                    onClick={() => closeModalState()}
                  >
                    отменить
                  </Button>

                  <Button
                    disabled={enadledNext}
                    variant={'catalog-link-uppercase'}
                  >
                    продолжить
                  </Button>

                </BlockGrid.BlockAddAddressContainerButton>

              </BlockGrid.Container>
            </Form>
          );
        }}
      </Formik>
    )
  } catch (err) {
    console.log('ERROR function add Address', res)
    let error = [Text({ text: 'error-on-server' })];
    if (err?.data) {
      const errors = err.data;
      if (typeof errors !== 'object') {
        error.push(`${errors}`)
      } else {
        error.push(`${errors[0]}`)
      }
    }
    dispatch('setModalState', {
      show: true,
      content: textErrorMessage(error),
      iconImage: errorAlertIcon,
      addClass: 'modal-alert-error',
      action: {
        title: ['продолжить', null]
      },
      onClick: () => closeModalState()
    })
  }

}

export const changePhoneFunc = async (changePhoneNewPhone, userId) => {
  const errorsMessenge = {
    phone: 'Не правильный номер телефона',
    requiredField: 'requiredField',
  };

  const initialValuesChangePhone = {
    phone: '+',
    userId: userId,
  }
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValuesChangePhone}
        validationSchema={changePhoneSchema(errorsMessenge)}
        onSubmit={changePhoneNewPhone}
      >
        {
          ({ handleSubmit, handleChange, values, errors, setValues }) => {

            return (
              <Form onSubmit={handleSubmit} >
                <BlockGrid.Container>
                  <BlockGrid.BlockCenter>
                    <Phone
                      placeholder="Введите номер телефона"
                      value={values.phone}
                      onChange={phone => {
                        setValues({
                          ...values,
                          'phone': phone
                        })
                      }}
                      defaultCountry={'RU'}
                      smartCaret={true}
                      limitMaxLength={true}
                      className={'form-input-number-phone'}
                    />
                    {errors.phone ? <ErrorField message={errors.phone} /> : null}
                  </BlockGrid.BlockCenter>
                  <Offset offset={30} />
                  <BlockGrid.BlockCenter>
                    <Button
                      type={'submit'}
                      variant={'black_btn_full_width-modal'}
                      slot={'suffix'}
                    >
                      Сменить номер
                    </Button>
                  </BlockGrid.BlockCenter>
                </BlockGrid.Container>
              </Form>
            )
          }
        }

      </Formik>
    </React.Fragment>
  )
}

export const accountDelete = async (deleteAccountFunc, closeModalState, userId) => {
  const initialValuesDeleteAccaunt = {
    reasonDeletion: '',
    enadledNext: true,
    checkDelete: '',
    userId: userId,
  }
  return (
    <BlockGrid.Container>
      <Formik
        initialValues={initialValuesDeleteAccaunt}
        onSubmit={deleteAccountFunc}
      >
        {({ handleSubmit, errors, values, handleChange, setFieldValue }) => {



          return (
            <Form
              onSubmit={(e) => handleSubmit(e, setFieldValue)}
            >

              <BlockGrid.BlockCenter>
                <BlockGrid.Coll>
                  <Title type={'h3'} >
                    Обратите внимание: данные удалятся безвозвратно!
                  </Title>
                  <Title type={'h3'}>
                    Вместе с аккаунтом мы удалим из системы вашу личную информацию, историю заказов и покупок.
                  </Title>
                  <Input
                    value={values.reasonDeletion}
                    name={'reasonDeletion'}
                    variant={'largeCustomLabel'}
                    onChange={handleChange}
                    label={Text({ text: 'reason.for.deletion' })}
                    placeholder={Text({ text: 'enter.text' })}
                  />
                  <Input
                    value={values.checkDelete}
                    name={'checkDelete'}
                    variant={'largeCustomLabel'}
                    onChange={e => {
                      const value = e.target.value;
                      if (value === 'delete') {
                        setFieldValue('enadledNext', false)
                      }
                      console.log({ value })
                      handleChange(e)
                    }}
                    label={'Для удаления аккаунта введите текст delete'}
                    placeholder={Text({ text: 'enter.text' })}
                  />

                  {
                    errors.message_button ? (
                      <Error message={errors.message_button} />
                    ) : null
                  }
                  <Offset offset={'40'} />
                  <BlockGrid.BlockAddAddressContainerButton>
                    <Button
                      variant={'catalog-link-transparent__modal'}
                      onClick={() => closeModalState()}
                    >
                      отменить
                    </Button>

                    <Button
                      disabled={values.enadledNext}
                      variant={'catalog-link-uppercase'}
                    >
                      {Text({ text: 'delete' })}
                    </Button>

                  </BlockGrid.BlockAddAddressContainerButton>

                </BlockGrid.Coll>
              </BlockGrid.BlockCenter>
            </Form>
          )
        }}

      </Formik>
    </BlockGrid.Container>
  )
}

export const contentMessage = () => {

  return (
    <React.Fragment>
      <BlockGrid.Container>
        <BlockGrid.BlockCenter>
          <BlockGrid.Row>
            <Title type={'h4'} >
              Вы отписались от рассылки
            </Title>
            <Offset offset={20} />
            <Title type={'h5'} >
              Вы отказались получать рассылки и теперь Вам не будут приходить уведомления
            </Title>
          </BlockGrid.Row>
        </BlockGrid.BlockCenter>
      </BlockGrid.Container>
    </React.Fragment>
  )
}

export const getMyCash = async (first_name, last_name, middle_name, dispatch, redirectTo, closeModalState) => {

  const initialValues = {
    fio: (middle_name && first_name && last_name) ?
      `${first_name} ${last_name} ${middle_name}`
      : (first_name && last_name) ?
        `${first_name} ${last_name}`
        : first_name ?
          `${first_name}`
          : '',
    cost: 0,
    beneficiaryBankAccountNumber: '',
    beneficiaryBankBIC: '',
    receipt: null,
    activeButton: true,
    activeSpinner: false
  };

  const errorsMessenge = {
    symbol: 'Поле не должно содержать спец. символы',
    requiredField: Text({ text: 'requiredField' }),
    requiredNotCountMony: 'Необходимо указать сумму платежа',
    shortComments: Text({ text: 'short.comments' }),
    longComments: Text({ text: 'long.comments' }),
    receipt: "файл не добавлен"
  };

  try {

    const requisites = await orderApi.getRandomRequizites();
    const sendRequestGetMyCash = async (data, { setFieldError }) => {
      try {

        const fdPayments = new FormData();
        fdPayments.set('cost', data.cost);
        fdPayments.set('name', data.fio);
        fdPayments.set('number', data.beneficiaryBankAccountNumber);
        fdPayments.set('bank', data.beneficiaryBankBIC);

        if (data.receipt === null) {
          setFieldError('receipt', 'Вы не приложили квитанцию об оплате')
        } else {
          fdPayments.set('receipt', data?.receipt[0]);

          const resCreatePayment = await orderApi.returnManyQuery(fdPayments)

          dispatch('setModalState', {
            show: true,
            content: 'Ваше заявление принято в работу!!!',
            iconImage: successAlertIcon,
            action: {
              title: ['Продолжить', null]
            },
            onClick: () => closeModalState()
          })
        }
      } catch (err) {
        let error = [Text({ text: 'error-on-server' })];
        const data = err?.data;
        console.log('ERROR IN CREATE request', err)
        if (!!data) {
          for (const key in data) {
            const element = Array.isArray(data[key]) ? data[key][0] : data[key];
            if (initialValues.hasOwnProperty(key)) {
              setFieldError(key, element)
            }
          }
        } else {
          //?! добавить попап с ошибкой
          dispatch('setModalState', {
            show: true,
            content: textErrorMessage(error),
            iconImage: errorAlertIcon,
            action: {
              title: ['Продолжить', null]
            },
            onClick: () => closeModalState()
          })
        }
      }
    }


    return (
      <Formik
        validationSchema={GetMyCacheModalContentShema(errorsMessenge)}
        initialValues={initialValues}
        onSubmit={sendRequestGetMyCash}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, setFieldValue, touched }) => {
          console.log('errors', { errors })
          console.log('values', { values })

          return (
            <Form onSubmit={handleSubmit}>
              <BlockGrid.Container>
                <WarningBlock
                  textWarning={<div>Оформление возврата возможно только при наличии скан-копии заявления на возврат,
                    прикрепленного в форматах .jpg (jpeg), .png, bmp, .zip, .rar, .pdf. Для отправки нескольких
                    файлов, приложите архив (zip, rar) в этой форме.</div>}
                >
                </WarningBlock>
                <BlockGrid.BlockPayment>
                  {/* 
                      //?! Сумма
                  */}
                  <Input
                    value={values.cost}
                    type={'number'}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'cost'}
                    autofocus
                    autocomplete={'off'}
                    onChange = { (e) => { 
                      values.cost && values.fio && values.beneficiaryBankBIC && values.beneficiaryBankAccountNumber && values.recient? setFieldValue( 'activeButton', false ) : null;
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    helpText={errors.cost && touched.cost ? <ErrorField message={errors.cost} /> : null}
                    label={'Сумма*'}
                  />
                  {/* 
                      //?! ФИО владельца счёта*
                  */}
                  <Input
                    value={values.fio}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'fio'}
                    autocomplete={'off'}
                    onChange = { (e) => { 
                      values.cost && values.fio && values.beneficiaryBankBIC && values.beneficiaryBankAccountNumber && values.recient? setFieldValue( 'activeButton', false ) : null;
                      handleChange(e);
                    }}
                    autofocus
                    onBlur={handleBlur}
                    helpText={errors.fio && touched.fio ? <ErrorField message={errors.fio} /> : null}
                    label={'ФИО владельца счёта*'}
                  />
                  {/* 
                      //?! № счёта в банке получателе*
                  */}
                  <Input
                    value={values.beneficiaryBankAccountNumber}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'beneficiaryBankAccountNumber'}
                    autocomplete={'off'}
                    onBlur={handleBlur}
                    onChange = { (e) => { 
                      values.cost && values.fio && values.beneficiaryBankBIC && values.beneficiaryBankAccountNumber && values.recient? setFieldValue( 'activeButton', false ) : null;
                      handleChange(e);
                    }}
                    helpText={
                      errors.beneficiaryBankAccountNumber && touched.beneficiaryBankAccountNumber ? <ErrorField message={errors.beneficiaryBankAccountNumber} /> : null
                    }
                    label={'№ счёта в банке получателе*'}
                  />
                  {/* 
                      //?! БИК банка получателя*
                  */}
                  <Input
                    value={values.beneficiaryBankBIC}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'beneficiaryBankBIC'}
                    autocomplete={'off'}
                    onBlur={handleBlur}
                    onChange = { (e) => { 
                      values.cost && values.fio && values.beneficiaryBankBIC && values.beneficiaryBankAccountNumber && values.recient? setFieldValue( 'activeButton', false ) : null;
                      handleChange(e);
                    }}
                    helpText={
                      errors.beneficiaryBankBIC && touched.beneficiaryBankBIC ? <ErrorField message={errors.beneficiaryBankBIC} /> : null
                    }
                    label={'БИК банка получателя*'}
                  />

                  <AddUploadFiles
                    label={'Прикрепить скан-копию заявления:'}
                    accept={'.png, .jpg, .jpeg, .bmp, .zip, .rar, .pdf'} //.jpg (jpeg), .png, bmp, .zip, .rar, .pdf.
                    onBlur={handleBlur}
                    multiple={null}
                    name={'receipt'}
                    setFieldValue={setFieldValue}
                    onChange = { (e) => { 
                      values.cost && values.fio && e.currentTarget.files? setFieldValue( 'activeButton', false ) : null;
                    }}
                  />
                  {errors.receipt && touched ? <Error message={errors.receipt} /> : null}

                  <Button
                    type={'submit'}
                    full
                    variant={'black_btn_full_width'}
                    disabled = { values.activeButton }
                  >
                    оформить возврат
                    { !values.activeButton && values.activeSpinner ? <BlockSpinner.Spinner sizeWidth='20' sizeHeight='20' slot={'icon-left'} bodrad = { 50 }/> : null }
                  </Button>
                </BlockGrid.BlockPayment>

              </BlockGrid.Container>
            </Form>
          );
        }}
      </Formik>
    )
  } catch (err) {
    console.log('ERROR IN CREATE PAYMENT', err)
    let error = [Text({ text: 'error-on-server' })];
    if (err?.data) {
      const errors = err.data;
      if (typeof errors !== 'object') {
        error.push(`${errors}`)
      } else {
        error.push(`${errors[0]}`)
      }
    }
    dispatch('setModalState', {
      show: true,
      content: textErrorMessage(error),
      iconImage: errorAlertIcon,
      addClass: 'modal-alert-error',
      action: {
        title: ['продолжить', null]
      },
      onClick: () => closeModalState()
    })
  }
}

export const contentInfoOrder = (status, role, numberOrder) => {

  return (
    <p
      style={
        {
          fontSize: '18px',
          padding: '10px 25px',

        }
      }
    >
      {
        status === 'payment_waiting' ?
          `Ваш заказ №${numberOrder} уже получен нами, ожидаем поступление оплаты за заказ. В течении суток необходимо прикрепить чек оплаты, либо заказ будет отменен.`
          : status === 'in_process' ?
            <>Ваш заказ №{numberOrder} оплачен и передан в работу Менеджеру по закупкам. Вас будут информировать о ходе закупки. Если товар в статусе "Заказано"-товар заказан у поставщика. Ожидаем поступления на склад. {role === ROLE.RETAIL ? '' : ' Если товар в статусе "В сборе" это значит, что идет сбор на размерный ряд. Как только ряд будет собран совместно всеми участниками сбора, статус товара изменится на "Товар оплачен". С этого момента отмена всего заказа возможна только через Администрацию сайта'} </>
            : status === 'packaging' ?
              `Ваш заказ  №${numberOrder} находится на упаковке и будет отправлен в течении двух рабочих дней`
              : status === 'delivery_payment_waiting' && role === ROLE.DROPSHIPPER ?
                `На Вашем балансе не хватает средств для оплаты стоимости доставки заказа №${numberOrder}. Пожалуйста, пополните баланс.`
                : status === 'delivery_paid' ?
                  `Ваш заказ №${numberOrder} готов к отправке.`
                  : status === 'sended' ?
                    `Ваш заказ №${numberOrder} отправлен. Трек номер доступен в личном кабинете`
                    : status === 'canceled' ?
                      `Заказ №${numberOrder} был отменен ${comment ? comment : ''}.`
                      : status === 'return' ?
                        `По Заказу №${numberOrder} оформлен возврат`
                        : status === 'chat' ?
                          `Сообщения в чате отправляются только для Менеджера по упаковке. Как только статус заказа будет «Заказ на упаковке», Ваши сообщения станут доступны Менеджеру, и  в случае необходимости, он сможет ответить в этом же чате`
                          : role === ROLE.WHOLESALE ? `Ваш заказ №${numberOrder} выкуплен и передан на отправку. Ожидайте поступления товара на склад в Москву` : `Ваш заказ №${numberOrder} выкуплен и передан на упаковку. Ожидайте номер отправления в течении двух рабочих дней`
      }
    </p>

  )
}
