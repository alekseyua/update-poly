import { Formik } from "formik";
import * as React from "react";
import api from "../../../api/api";
import { ROLE } from "../../../const";
import { changeAddAddressSchema, feedbackSheme, payModalScheme } from "../../../helpers/schemesFormic";
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
import { errorAlertIcon } from "../../../images";
import PhoneField from "../../../Views/PhoneField";
import TextUnderTitle from "../../../Views/TextUnderTitle";

const contentApi = api.contentApi;
const orderApi = api.orderApi;

export const feedback = async (onSubmit, dispatch, fullName, email) => {
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
        validationSchema = { feedbackSheme() }
        initialValues = {{
          problem_area: '',
          name: fullName,
          email: email,
          message: '',
          files: null,
          activeButton: true
        }}
        onSubmit = { onSubmit }
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, setFieldValue, touched }) => {

          return (
          
            <Form onSubmit = { handleSubmit } >
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
                    helpText = { errors.problem_area && touched.problem_area ? <ErrorField message = { errors.problem_area } /> : null }
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
                    onChange={(e)=>{
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
                    type = {'file'}
                    className={'wrapperBtnFile'}
                    label={'Прикрепить изображение:'}
                    accept={'.png, .jpg, .jpeg, .mp4'}
                    onBlur={handleBlur}
                    multiple={null}
                    setFieldValue={setFieldValue}
                  />

                  { errors.files ? <ErrorField message = { errors.files } /> : null}

                  <Offset offset={'content'} />
                  <Button
                    type = {'submit'}
                    full
                    variant = {'black_btn_full_width'}
                    disabled = {values.activeButton}
                    handleBlur = {handleBlur}
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
    dispatch('setModalState', {
      show: false,
    })
  }
}

export const addToCart = (
  product_rcAmount,
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
    fio: `${first_name} ${last_name} ${middle_name}`,
    cost: 0,
    comment: '',
    receipt: null,
    order_id: order_id,
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
    const sendCheckToServer = async (data, { setFieldError }) => {
      try {
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
          console.log('result check', resCreatePayment)
          redirectTo('/orders')
        }
      } catch (err) {

        const data = err?.data;
        console.log('ERROR IN CREATE PAYMENT', err)
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
            content: 'Произошла ошибка попробуйте позже!!!',
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
        validationSchema={payModalScheme(errorsMessenge)}
        initialValues={initialValues}
        onSubmit={sendCheckToServer}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, setFieldValue, touched }) => {
          console.log('errors', { errors })
          console.log('values', { values }, { total_price }, { balance })

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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    name = { 'receipt' }
                    setFieldValue={setFieldValue}
                  />
                  {errors.receipt && touched ? <Error message={errors.receipt} /> : null}

                  <Button 
                    type = {'submit'} 
                    full 
                    variant = {'black_btn_full_width'}
                  >
                    ОПЛАТИТЬ

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
  }
}

export const textSuccessMessage = (text) => {
  return (
    <BlockGrid.Container>
      <BlockGrid.BlockMessage>
        { text }
      </BlockGrid.BlockMessage>
    </BlockGrid.Container>
  )
}

export const textErrorMessage = ( error ) => {
  return (
    <BlockGrid.Container>
        <BlockGrid.BlockMessage>
            { error.map( ( el, i ) => <p key = {`error-${i}`}> { el } </p>) }
        </BlockGrid.BlockMessage>
    </BlockGrid.Container>
  )
}

export const addAddressForPost = async ( currency, first_name, last_name, middle_name, phone, email, dispatch, closeModalState ) => {
  try{
  const resCountry = await orderApi.getCountry();
  const countryOptions = resCountry.map((el) => {
        return {
          value: el.id,
          title: el.title,
        };
      })

  console.log({countryOptions})

  const defaultParamsInitData = {
    city: '',
    country: '',
    first_name: '',
    flat: '',
    id: null,
    last_name: '',
    middle_name: '',
    phone: '',
    post_code: '',
    profile: null,
    street: '',
    house: '',
  };

  const errorsMessenge = {
    shortLastName: Text({ text: 'short.last.name' }),
    longLastName: Text({ text: 'longLastName' }),
    requiredField: Text({ text: 'requiredField' }),
    longFirstname: Text({ text: 'long.first.name' }),
    longPatronymic: Text({ text: 'long.patronymic' }),
    phone: Text({ text: 'invalid.phone' }),
    postcode: Text({ text: 'invalid.postcode' }),
    maxLengthField: Text({ text: 'max.length.field' }),
  };
  const createAddress = async (data, setFieldError) => {
    try{

      const resCreateAddress = await orderApi.postOrderAddressDeliviry(data, profileId)
      console.log({resCreateAddress})  
    // .then((res) => {
      //     console.log('res:', res)
    //     closeModal();
    //     setIsSaved(true);
    //     setInititalValues(defaultParamsInitData);
    //     updateAddressRenderData();
    //   })
    }catch(err){
        console.log(err)
        if(!!err?.data){
          const {data} = err;
          for (let key in data){
            console.log('key:', key)
            const element = data[key];
            setFieldError('count', element);
          }
        }
      }
  };
  const updateAddress = async (data) => {
    try{

      const resUpdateAddress = await orderApi.putByIdOrderAddressDeliviry(initialData.id, data)
      // .then((res) => {
      //   setIsSaved(true);
      //   setInititalValues(defaultParamsInitData);
      //   updateAddressRenderData();
      //   closeModal();
      // })
      console.log({resUpdateAddress})
    }catch(err){
      console.error(`ERROR updateAddress`,err)
    }
  };
  const onSubmit = (data, {setFieldError}) => {
    console.log('setFieldError:', setFieldError)
    if (typeModal === 'create') {
      return createAddress(data,setFieldError);
    } else if (typeModal === 'change') {
      return updateAddress(data);
    }
  };

  const openModalFeedback = () => {
    dispatch('feedback')
  }


  return (
    <Formik
    enableReinitialize
    validationSchema={changeAddAddressSchema(errorsMessenge)}
    initialValues={defaultParamsInitData}
    onSubmit={onSubmit}
  >
    {({ handleSubmit, handleChange, values, errors, setFieldValue, handleBlur, touched }) => {
      console.log('errors:', errors)
      return (
        <Form onSubmit={handleSubmit}>
           <BlockGrid.Container>
              <TextUnderTitle>
                  Если Вашей страны нет в списке, просьба создать запрос на добавление страны через 
                  <span
                    onClick = { openModalFeedback }
                  > окно
                  </span>
                  обратной связи
              </TextUnderTitle>
            <BlockGrid.BlockAddAddressContainer>
              <BlockGrid.BlockAddAddressLeftSide>

                <BlockGrid.BlockAddAddressCell>
                  <Input
                    value={values.lastname}
                    name={'lastname'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.lastname && touched.lastname ? 'error' : ''}
                    helpText={
                      errors.lastname && touched.lastname ? (
                        <ErrorField message={errors.lastname} />
                      ) : null
                    }
                    label={Text({ text: 'lastname' })}
                    placeholder={Text({ text: 'enterLastName' })}
                    data-cy={'modal_add_address_lastname'}
                  />
                </BlockGrid.BlockAddAddressCell>

                <BlockGrid.BlockAddAddressCell>
                  <Input
                    value={values.firstname}
                    name={'firstname'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.firstname && touched.firstname ? 'error' : ''}
                    helpText={ errors.firstname && touched.firstname ? <ErrorField message={errors.firstname} /> : null }
                    label={Text({ text: 'firstname' })}
                    placeholder={Text({ text: 'enterFirstName' })}
                    data-cy={'modal_add_address_firstname'}
                  />
                </BlockGrid.BlockAddAddressCell>

                <BlockGrid.BlockAddAddressCell>
                  <Input
                    value={values.patronymic}
                    name={'patronymic'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.patronymic && touched.patronymic ? 'error' : ''}
                    helpText = { errors.patronymic && touched.patronymic ?  <ErrorField message={errors.patronymic} /> : null }
                    label={Text({ text: 'patronymic' })}
                    placeholder={Text({ text: 'enterPatronymic' })}
                    data-cy={'modal_add_address_patronymic'}
                  />
                </BlockGrid.BlockAddAddressCell>

                <BlockGrid.BlockAddAddressCell>
                  <PhoneField
                    variant={'varian-input'}
                    value={values.phone} 
                    name={'phone'}
                    onBlur={handleBlur}
                    placeholder={Text({ text: 'enterPhone' })}
                    autocomplete={'off'}
                    label={Text({ text: 'mobPhone' })}
                    onChange={(e) => {
                      setFieldValue('phone', e.detail.formattedValue);
                    }}
                    className={errors.phone && touched.phone ? 'error' : ''}
                    helpText = { errors.phone && touched.phone? <ErrorField message={errors.phone} /> : null }
                  />
                </BlockGrid.BlockAddAddressCell>

              </BlockGrid.BlockAddAddressLeftSide>

              <BlockGrid.BlockAddAddressRightSide>
                <BlockGrid.BlockAddAddressCell>
                  <Select
                    className = { 'select-default' }
                    value = { values.country }
                    onBlur={handleBlur}
                    variant = { 'largeCustomLabel' }
                    name = { 'country' }
                    placeholder = { Text({ text: 'enter.country' }) }
                    label = { Text({ text: 'country' }) }
                    onClick={e => {
                      setFieldValue('country', e.target.getAttribute('value'))
                    }}
                    options={countryOptions}
                  >
                    {errors.country && touched.country ? (
                      <ErrorField slot={'help-text'} message={errors.country} />
                    ) : null}
                  </Select>
                </BlockGrid.BlockAddAddressCell>

                <BlockGrid.BlockAddAddressCell>
                  <Input
                    value={values.postcode}
                    name={'postcode'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.postcode && touched.postcode ? 'error' : ''}
                    helpText={
                      errors.postcode && touched.postcode ? (
                        <ErrorField message={errors.postcode} />
                      ) : null
                    }
                    label={Text({ text: 'postcode' })}
                    placeholder={Text({ text: 'enter.postcode' })}
                  />
                </BlockGrid.BlockAddAddressCell>

                <BlockGrid.BlockAddAddressCell>
                  <Input
                    value={values.city}
                    name={'city'}
                    onChange={handleChange}
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

                {/* <BlockGrid.FormRow> */}
                  {/* <BlockGrid.FormColl> */}
                    <BlockGrid.BlockAddAddressCell>
                      <Input
                        value={values.houseNumber}
                        name={'houseNumber'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.houseNumber && touched.houseNumber ? 'error' : ''}
                        helpText={errors.houseNumber && touched.houseNumber ? ( <ErrorField message={errors.houseNumber} />) : null}
                        label={Text({ text: 'house.number' })}
                        placeholder={Text({ text: 'enter.house.number' })}
                        data-cy={'modal_add_address_house_number'}
                      />
                    </BlockGrid.BlockAddAddressCell>
                  {/* </BlockGrid.FormColl> */}

                  {/* <BlockGrid.FormColl> */}
                    <BlockGrid.BlockAddAddressCell>
                      <Input
                        value={values.apartamentNumber}
                        name={'apartamentNumber'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.apartamentNumber && touched.apartamentNumber ? 'error' : ''
                        }
                        helpText={
                          errors.apartamentNumber && touched.apartamentNumber ? (
                            <ErrorField message={errors.apartamentNumber} />
                          ) : null
                        }
                        label={Text({ text: 'apartament.number' })}
                        placeholder={Text({ text: 'enter.apartaments.number' })}
                        data-cy={'modal_add_address_apartament_number'}
                      />
                    </BlockGrid.BlockAddAddressCell>
                  {/* </BlockGrid.FormColl> */}

                {/* </BlockGrid.FormRow> */}

              </BlockGrid.BlockAddAddressRightSide>

              <BlockGrid.BlockAddAddressContainerButton>
                
                <Button
                  className = {''}
                  variant = { ''  }
                >
                  отменить
                </Button>
                
                <Button
                  className = {''}
                  variant = { ''  }
                >
                  продолжить
                </Button>

              </BlockGrid.BlockAddAddressContainerButton>
            </BlockGrid.BlockAddAddressContainer>

            
            <ErrorField message = { errors.count } />
          </BlockGrid.Container>
        </Form>
      );
    }}
  </Formik>
  )
}catch(err){
  console.log('ERROR function add Address', res)
}

}