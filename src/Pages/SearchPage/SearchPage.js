import React from 'react';
import SearchPageLayoutContainer from './SearchPageLayout/SearchPageLayoutContainer';

const SearchPage = ({
    context,
}) => {

    // console.log({context})
    const { breadcrumbs, currency, profile } = context;
    const { role } = profile;

    return (
        <SearchPageLayoutContainer
            breadcrumbs = { breadcrumbs }
            currency = { currency }
            role = { role }
        />
    )
}

export default SearchPage;