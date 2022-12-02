import React from 'react';
import { useStoreon } from 'storeon/react';
import NotificationsPageLayout from './NotificationsPageLayout';

const NotificationsPageLayoutContainer = ({
    amountNotifications,
    cabinet_site_menu,
    notifications,
    cabinet_menu,
    breadcrumbs,
    create_shop,
    is_has_shop,
    currency,
    username,
    balance,
    shop,
    role,

    stateActiveCheckNotice,
}) => {
    const { dispatch } = useStoreon();


    const heandlerReedNotic = () => {
        dispatch('reedItemsNotice')
    }
    const heandlerDelNotic = () => {
        dispatch('deleteItemsNotice')
    }
    const heandlerCheckAllNotice = (idItem) =>{

        const params = {
            idItems: +idItem
        }
        dispatch('checkedAllItemsNotice', params)
    }

    const heandlerCheckNotice = (idItem) =>{

        const params = {
            idItem: +idItem
        }
        dispatch('checkedItemsNotice', params)
    }

    const changePaginations = (page) => {
        //?! меняем страницы уведомлений
        const params = {
            page: page
        }
        dispatch('getNotice',params)
    }

    return (
        <NotificationsPageLayout
            amountNotifications = { amountNotifications }
            cabinet_site_menu = { cabinet_site_menu }
            notifications = { notifications }
            cabinet_menu = { cabinet_menu }
            breadcrumbs = { breadcrumbs }            
            create_shop = { create_shop }
            is_has_shop = { is_has_shop }
            currency = { currency }
            username = { username }
            balance = { balance }
            shop = { shop }
            role = { role }

            heandlerReedNotic={heandlerReedNotic} 
            heandlerDelNotic={heandlerDelNotic} 
            heandlerCheckAllNotice = { heandlerCheckAllNotice }
            heandlerCheckNotice = { heandlerCheckNotice }
            stateActiveCheckNotice = { stateActiveCheckNotice }
            changePaginations = { changePaginations }
        />
    )
}

export default NotificationsPageLayoutContainer;