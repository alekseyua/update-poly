import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useStoreon } from 'storeon/react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import DropdownMenuAccount from '../DropdownMenuAccount/DropdownMenuAccount';
import SearchPageViews from '../../../../Views/SearchPageViews';

import style from './headerbuttonsbottonlk.module.scss';

const HeaderButtonsBottomLK = ({
    profile,
    currency,
    ...props
}) => {
    // console.log({props})
    const inCartProducts = profile?.cart;
    const inWishlist = profile?.wishlist;
    const inNotification = profile?.notifications;
    const [searchInputShow, setSearchInputShow] = useState(false);
    const [ stateOpen, setStateOpen ] = useState(false);
    const { textSearch, dispatch } = useStoreon('textSearch');
    const { search } = useStoreon('search');
    const searchBgRef = useRef(null);
    const openMenuRef = useRef(null);
    const navigate = useNavigate();

    const handleClickSearchRoot = () => {
        console.log('click search', searchInputShow)
        setSearchInputShow(c=>!c);
    }

    const handlerProfileLk = () => setStateOpen(c=>!c);
    
    const handlerChangeValue = (e) => {
        let value = e.target.value;
        dispatch('setInputSearchValue', value)
    }

    const logOut = () => {
        // ?!выход
        // console.log('logout account HeaderButtonsBottomLK')
        dispatch('setModalState', {
            show: true,
        })
        const params = {
            redirectTo: (path) => {
                const timerTimeout = setTimeout(()=>{
                    navigate(path);
                    return () => clearTimeout(timerTimeout);
                },3000)
            }
        }
        dispatch('logoutOut', params)
    }

    const getKeyForAccess = (data) =>{

        //?!отправляем запрос на почту
        const paramsSendEmail = {
            type : 'resend',
            email: data.email,
            username: data.username,
            redirectTo: (path) => {
                const timerTimeout = setTimeout(()=>{
                    navigate(path);
                    return () => clearTimeout(timerTimeout);
                },2000)
            }
        }
        dispatch('getNewSubmitCode', paramsSendEmail)
        //?! открываем попап для ввода пароля с почты
        // const params = {
        //     username: data.username, 
        //     type : 'resend',
        //     email: data.email,
           
        // }
        // dispatch('inputKeyFromEmail', params)
    }

    // !?закрываем строку поиска при клике вне поля с поиском
    useEffect(()=>{
        const clickOutsideArea = (e) => {(
            setSearchInputShow(true),
            (      e.target.getAttribute('name') === 'search__close' 
                || e.target.getAttribute('name') === 'product-price'
                || e.target.getAttribute('name') === 'product-price3'
                || e.target.getAttribute('name') === 'product-price2'
                || e.target.getAttribute('name') === 'product-price1'
                || e.target.getAttribute('name') === 'product-price'  )?
                     setSearchInputShow(false) 
                     : null,
            searchBgRef.current.contains(e.target) || e.target.getAttribute('name') === 'input-search' 
            ) || (
                setSearchInputShow(false),
                dispatch('changeTextSearch', '')
            );
        }
        document.addEventListener('click', clickOutsideArea);
        return removeEventListener('click', clickOutsideArea);
    },[])

    // !?закрываем меню при клике вне меню
    useEffect(()=>{
        const clickOutsideArea = (e) => (
            openMenuRef.current.contains(e.target) //|| e.target.getAttribute('name') === 'lk-menu'
        ) || (
            setStateOpen(false)
        );
        document.addEventListener('click', clickOutsideArea);
        return removeEventListener('click', clickOutsideArea);
    },[])

    return (
        <div
            className={classNames({
                [style['header-buttons']]: true,
            })}
        >
            {/* //!button */}
            <div
                className={style['header-buttons__lk-profile-btn']}
                onClick={handleClickSearchRoot}
                ref={searchBgRef}
            >
                <SearchPageViews.SearchWrapper
                    openSearchInput={searchInputShow}
                >
                    <SearchPageViews.SearchInput
                        searchInputShow={searchInputShow}
                        handlerChangeValue={handlerChangeValue}
                        inputValue={textSearch}
                        handleClickSearchRoot={handleClickSearchRoot}
                    />
                    { 
                        !!textSearch?
                            <SearchPageViews.SearchResultsDropdown
                                search={search}
                                currency = {currency}
                                urlShowAll={`/search?q=${textSearch}`} // нужно правильно сложить строку
                                urlNothingSearch={''}
                            />
                            : null
                    }
                </SearchPageViews.SearchWrapper>
                <span
                    className={'_icon-search'}
                >
                </span>

            </div>

            {/* //!catalog icon mobile */}
            <div
                className={style['header-buttons__lk-profile-btn']}
            >
                <Link
                    to={'/catalog'}
                    className={style['header-buttons__links']}
                >
                <span
                    className={'_icon-clothes-hanger-svgrepo-com'}
                ></span>
                </Link>
            </div>
            
            {/* //!own lk office */}
            <div
                className={style['header-buttons__lk-profile-btn']}
                onClick={handlerProfileLk}
                ref={openMenuRef}
            >
                
                <DropdownMenuAccount
                    site_configuration={props.site_configuration}
                    cabinet_menu={props.cabinet_menu}
                    profile={profile}
                    stateOpen={stateOpen}

                    logOut={logOut}
                    getKeyForAccess={getKeyForAccess}
                />
                
                
                
                <span
                    className={'_icon-user'}
                    dataintro={"step7"}
                    name={'lk-menu'}
                >
                 {
                        !!inNotification ?
                            <span
                                className={style['header-buttons__count-in']}
                            >
                                {inNotification}
                            </span>
                            : null
                    }   
                </span>
            </div>
            <div
                className={style['header-buttons__lk-profile-btn']}
            >
                 <Link
                    className={style['header-buttons__links']}
                    to={'/wishlist'}
                >                    
                    <span
                        className={'_icon-favorite'}
                        >
                            
                        {
                            !!inWishlist ?
                                <span
                                    className={style['header-buttons__count-in']}
                                >
                                    {inWishlist}
                                </span>
                                : null
                        }
                    </span>
                </Link>
            </div>
            <div
                className={style['header-buttons__lk-profile-btn']}
            >
                 <Link
                    className={style['header-buttons__links']}  
                    to={'/cart'}
                >   
                    <span
                        className={'_icon-cart'}
                        id={'cart-id'}     
                    >                        
                        {
                            !!inCartProducts ?
                                <span
                                    className={style['header-buttons__count-in']}
                                >
                                    {inCartProducts}
                                </span>
                                : null
                        }
                    </span>
                </Link>
            </div>



        </div>
    )
}

export default HeaderButtonsBottomLK;