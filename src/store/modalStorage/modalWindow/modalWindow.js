import { Formik } from "formik";
import * as React from "react";
import api from "../../../api/api";
import { ROLE } from "../../../const";
import { feedbackSheme } from "../../../helpers/schemesFormic";
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

const contentApi = api.contentApi;

export const feedback = async (onSubmit, dispatch) => {
    try{

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
                name: '',
                email: '',
                message: '',
                files: null,
                activeButton: false
              }}
              onSubmit={onSubmit}
            >
              {({ handleSubmit, handleChange, handleBlur, values, errors, setFieldValue, touched, onSubmit}) => {
                return (
                  <Form noValidate onSubmit={handleSubmit}>
                    <BlockGrid.Container>
                      <Title mb={'40px'} title={'Форма обратной связи'} />
                      <WarningBlock
                        textWarning = {'В случае возниконовения вопросов Вы можете свызаться с нами с помощью формы ниже. Ответ по Вашему обращению Вы получите в течении 3х рабочих дней на указанный почтовый адрес'}
                      />
                      <BlockGrid.BlockFeedback>
                        <Select
                          autocomplete={'off'}
                          placeholder={'Выбирете раздел'}
                          variant={'select-feedback'}
                          name={'problem_area'}
                          value={values.problem_area}
                          onClick={ e => setFieldValue('problem_area',e.target.getAttribute('name'))}
                          label={'Тематика обращения'}
                          options={optionsProblemArea}
    
                          />
                        <Input
                          className={'input-mt_20'}
                          value={values.name}
                          variant={'largeCustomLabel'}
                          name={'name'}
                          onChange={handleChange}
                          data-cy={'registration_first_name'}
                          autocomplete={'off'}
                          label={'Как к Вам обращаться'}
                          placeholder={'Введите Ваше Имя'}
                          onBlur={handleBlur}
                          helpText={errors.name && touched.name? <ErrorField message={errors.name} /> : null}
                          />
                        <Input
                          className={'input-mt_20'}
                          value={values.email}
                          variant={'largeCustomLabel'}
                          name={'email'}
                          onChange={handleChange}
                          data-cy={'registration_first_name'}
                          autocomplete={'off'}
                          label={'Адрес эл.почты'}
                          placeholder={'Введите Ваш email'}
                          onBlur={handleBlur}
                          helpText={errors.email && touched.email? <ErrorField message={errors.email} /> : null}
                        />
                        <TextArea
                          value={values.message}
                          name={'message'}
                          onChange={handleChange}
                          placeholder={'Напишите Ваш вопрос'}
                          label={'Описание'}
                          className={'feedback__textarea'}
                          onBlur={handleBlur}
                          helpText = { errors.message && touched.message? <Error message={errors.message} /> : null }
                        ></TextArea>
                        <Offset offset={'content'} />
                        <input
                          className={'wrapperBtnFile'}
                          name={'files'}
                          onChange={(e) => {
                            const files = e.currentTarget.files;
                            setFieldValue('files', files[0]);
                          }}
                          onBlur={handleBlur}
                          type="file"
                          helpText={errors.files ? <ErrorField message={errors.files} /> : null}
                        />
                        {errors.files && touched.files? <Error message={errors.files} /> : null}
    
                        <Offset offset={'content'} />
                        <Button
                          type={'submit'} 
                          full 
                          variant={'black_btn_full_width'}
                          disable = {values.activeButton}
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
  }catch(err){
    console.log('ERROR GET FEEDBACK', err)
    dispatch('setModalState',{
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
        type = 'h1'
        fontSize = { '25px' }
        textAlign = { 'center' }
      >
        Добавлено в корзину
      </Title>
        <AddToCart.AddToCartContainer>

          <AddToCart.AddToCartDescription>

            <AddToCart.AddToCartDescriptionImage
              image = { image }
            />

            <AddToCart.AddToCartDescriptionContent>
              <AddToCart.AddToCartDescriptionContentTitle
                title = { title }
              />
              {
                role === ROLE.RETAIL || role === ROLE.DROPSHIPPER?
                  <React.Fragment>
                    <AddToCart.AddToCartDescriptionContentSize
                      size = { sise }
                      />
                    <AddToCart.AddToCartDescriptionContentColor
                      color = { color }
                    />
                  </React.Fragment>
                  : <AddToCart.AddToCartDescriptionContentProductRc
                      product_rc = { product_rc }
                    />
              }
            </AddToCart.AddToCartDescriptionContent> 

          </AddToCart.AddToCartDescription>
          
          <AddToCart.AddToCartPriceContainer>
          {
            old_price ?
              <AddToCart.AddToCartPriceDiscount 
                currency = { currency }
                old_price = { old_price }
              />              
              : null
          }
          
          {
            price ?
              <AddToCart.AddToCartPrice
                price = { price }
                currency = { currency }
              />              
              : null
          }

          {
            role === ROLE.WHOLESALE && is_collection?
              <AddToCart.AddToCartPriceCollection
                price = { price }
                product_rcAmount = { product_rcAmount }
                currency = { currency }
              />              
              : null
          }
         
         </AddToCart.AddToCartPriceContainer>

      </AddToCart.AddToCartContainer>
    </AddToCart.AddToCartWrapper>
  )
}