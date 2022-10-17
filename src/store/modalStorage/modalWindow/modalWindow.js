import { Formik } from "formik";
import * as React from "react";
import api from "../../../api/api";
import { ROLE } from "../../../const";
import { feedbackSheme, payModalScheme } from "../../../helpers/schemesFormic";
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
                      console.log({e})
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