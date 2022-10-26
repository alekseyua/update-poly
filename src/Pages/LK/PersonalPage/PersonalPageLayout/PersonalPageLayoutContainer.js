import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import PersonalPageLayout from './PersonalPageLayout';

const PersonalPageLayoutContainer = ({
            receive_newsletter,        
            cabinet_site_menu,
            addressDilivery,
            organization,
            cabinet_menu,
            breadcrumbs,
            create_shop,
            is_has_shop,
            currency,
            username,
            profile,
            balance,
            shop,
            role,     

            email, 
            first_name, 
            last_name, 
            middle_name, 
            phone,
            insta_link, 
            site_link, 
            vk_link,
}) => {
    const { dispatch } = useStoreon()
    const navigator = useNavigate();

    const updateDataUser = (data, { setFieldValue, setFieldError }) => {
        dispatch('updateUserData', {
            ...data,
            setFieldValue,
            setFieldError
        });        
    }
  
    const changePhone = () => {
        dispatch('modalChangePhone'); 
    }
  
    const changePassword = (e) => {
        console.log({e})
        dispatch('openModalRestorePassword')
    }

    const deleteAccaunt = () => {
        dispatch('modalDeleteAccaunt', {
            redirectTo: (path) => {
                const timerSetTimeout = setTimeout(()=>{
                        navigator(path)
                    return () => clearTimeout(timerSetTimeout);
                },500)
            }
        })
    }

    const changeReiciveNewLatters = (e, values, setValues ) => {
        dispatch('modalQuestionAreYouSure',{
            e: e,
            values: values,
            setValues: setValues
        })            
    }

    return (
        <PersonalPageLayout
            receive_newsletter = { receive_newsletter }
            cabinet_site_menu = { cabinet_site_menu }
            addressDilivery = { addressDilivery }
            cabinet_menu = { cabinet_menu }
            organization={organization}
            breadcrumbs = { breadcrumbs }
            create_shop = { create_shop }
            is_has_shop = { is_has_shop }
            username = { username }
            currency = { currency }
            profile = { profile }
            balance = { balance }
            shop = { shop }
            role = { role }

            email = { email }
            phone = { phone }
            vk_link = { vk_link }
            last_name = { last_name }
            site_link = { site_link }
            insta_link = { insta_link }
            first_name = { first_name }
            middle_name = { middle_name }

            changePhone = { changePhone }
            updateDataUser = { updateDataUser }
            changePassword = { changePassword }
            deleteAccaunt = { deleteAccaunt }
            changeReiciveNewLatters = { changeReiciveNewLatters }
        />
    )
}

export default PersonalPageLayoutContainer;