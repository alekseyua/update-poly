import { Formik } from "formik";
import api from "../../../api/api";
import { feedbackSheme } from "../../../helpers/schemesFormic";
import Button from "../../../Views/Button";
import Error from "../../../Views/Error";
import ErrorField from "../../../Views/ErrorField";
import Form from "../../../Views/Form";
import BlockGrid from '../../../Views/GridContainerBlock';
import Input from "../../../Views/Input";
import Offset from "../../../Views/Offset";
import Select from "../../../Views/Select";
import Title from "../../../Views/Title";
import WarningBlock from "../../../Views/WarningBlock";

const contentApi = api.contentApi;

export const feedback = async (onSubmit) => {

    const res = await contentApi.getProblemArea();
    const optionsProblemArea = await res.map((el) => {
            return {
              value: el.id,
              title: el.problem_area,
            };
          })
    
    console.log({optionsProblemArea})

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
              {({ handleSubmit, handleChange, handleBlur, values, errors, setFieldValue, touched}) => {
    
                return (
                  <Form noValidate onClick={handleSubmit}>
                    <BlockGrid.Container>
                      <Title mb={'40px'} title={'Форма обратной связи'} />
                      <WarningBlock>
                      В случае возниконовения вопросов Вы можете свызаться с нами с помощью формы ниже. Ответ по Вашему обращению Вы получите в течении 3х рабочих дней на указанный почтовый адрес
                      </WarningBlock>
                      <BlockGrid.BlockFeedback>
                        <Select
                          autocomplete={'off'}
                          placeholder={'Введите'}
                          variant={'select-feedback'}
                          name={'problem_area'}
                          value={values.problem_area}
                          onChange={handleChange}
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
                          placeholder={'Введите'}
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
                          placeholder={'Введите email'}
                          onBlur={handleBlur}
                          helpText={errors.email && touched.email? <ErrorField message={errors.email} /> : null}
                        />
                        <textarea
                          value={values.message}
                          name={'message'}
                          onChange={handleChange}
                          placeholder={'Напишите Ваш вопрос'}
                          label={'Описание'}
                        //   className={style['text-area-form']}
                          onBlur={handleBlur}
                        ></textarea>
                        {errors.message && touched.message? <Error message={errors.message} /> : null}
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
                          full variant={'cancel-black-full'}
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
}