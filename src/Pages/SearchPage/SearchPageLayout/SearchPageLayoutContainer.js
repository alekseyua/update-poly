import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import SearchPageLayout from './SearchPageLayout';

const SearchPageLayoutContainer = ({
    breadcrumbs,
    currency,
    role
}) => {
    
    const { dispatch, search, textSearchStore } = useStoreon('search','textSearchStore');

    const navigate = useNavigate();
    const gotoPrevPage = () => {
        navigate(-1);
    };

    const handlerChangePaginations = (page) => {
        const params = {
            page: page
        }
        dispatch('getProductSearch', params)
    }
    
    const showMore = () => {
        const params = {
            page: search?.currentPage + 1
        }
        dispatch('getProductSearch', params);
    }

    return (
        <SearchPageLayout
            handlerChangePaginations = { handlerChangePaginations }
            currentPage = { search?.currentPage ?? 1 }
            showMore = { showMore }
            textSearchStore = { textSearchStore }
            gotoPrevPage = { gotoPrevPage }
            breadcrumbs = { breadcrumbs }
            currency = { currency }
            search = { search }
            role = { role }
        />
    )
}

export default SearchPageLayoutContainer;