import { Formik } from 'formik';
import React from 'react';
import AuthorizationAndRegViews from '../../../Views/AuthorizationAndRegViews';
import { signInSchemaByUsername } from '../../../helpers/schemesFormic';
import ErrorField from '../../../Views/ErrorField';
import CheckBox from '../../../Views/CheckBox';
import Button from '../../../Views/Button';
import Input from '../../../Views/Input';
import Text from '../../../helpers/Text';
import Form from '../../../Views/Form';
import BlockSpinner from '../../../Views/SpinnerWrapper';

const AuthorizationForm = (props) => {
    const { onSubmit, onHandleChangeRemember, errorsMessenge, initialValueAuthorization, openModalRestorePassword, loading } = props;
    return (
        <Formik
            validationSchema={signInSchemaByUsername(errorsMessenge)}
            initialValues={initialValueAuthorization}
            onSubmit={onSubmit}
        >
            {
                (props) => {
                    const { values, handleChange, errors, touched, handleBlur, setValues, setFieldError, handleSubmit } = props;
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Input
                                value={values.username}
                                variant={'largeCustomLabel'}
                                className={'input-mt_20'}
                                name={'username'}
                                autocomplete={'off'}
                                onChange={handleChange}
                                data-cy={'authorization_username'}
                                label={Text({ text: 'username' })}
                                onBlur={handleBlur}
                                helpText={errors.username && touched.username ? <ErrorField message={errors.username} /> : null}
                            />
                            <Input
                                type={'password'}
                                className={'input-mt_20'}
                                value={values.password}
                                variant={'largeCustomLabel'}
                                autocomplete={'off'}
                                name={'password'}
                                label={Text({ text: 'password' })}
                                data-cy={'authorization_password'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helpText={errors.password && touched.password ? <ErrorField message={errors.password} /> : null}
                            />
                            <AuthorizationAndRegViews.GroupBlock>
                                <CheckBox
                                    checked={values.remember}
                                    name={'remember'}
                                    onChange={ () => onHandleChangeRemember(setValues, values)}
                                    label={Text({ text: 'remember' })}
                                    data-cy={'authorization_check_box_remember'}
                                />
                                <Button
                                    variant={'looksLikeLink'}
                                    type={'button'}
                                    onClick={openModalRestorePassword}
                                    data-cy={'authorization_forgot_password'}
                                >

                                    <Text text={'forgotYourPassword'} />
                                </Button>
                            </AuthorizationAndRegViews.GroupBlock>

                            <AuthorizationAndRegViews.ErrorBlock helpText={errors.serverError} />
                            
                            <Button
                                variant={'black_btn_full_width'}
                                type={'submit'}
                                data-cy={'authorization_button'}

                            >
                                <Text text={'toComeIn'} />
                                 {loading ? <BlockSpinner.Spinner sizeWidth='20' sizeHeight='20' slot={'icon-left'} bodrad = { 50 }/> : null}
                            </Button>
                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default AuthorizationForm;