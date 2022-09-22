import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useStoreon } from 'storeon/react';
import { Link } from 'react-router-dom';

import DropdownMenuAccount from '../DropdownMenuAccount/DropdownMenuAccount';
import SearchPageViews from '../../../../Views/SearchPageViews';

import style from './headerbuttonsbottonlk.module.scss';

const HeaderButtonsBottomLK = (props) => {
    const [searchInputShow, setSearchInputShow] = useState(false);
    const [ stateOpen, setStateOpen ] = useState(false);
    const { textSearch, dispatch } = useStoreon('textSearch');
    const { search } = useStoreon('search');
    const searchBgRef = useRef(null);
    const openMenuRef = useRef(null);

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
        dispatch('logoutOut')
    }

    const getKeyForAccess = () =>{
        console.log('нужно сделать запрос на подтверждение почты через storeon')
    }

    // !?закрываем строку поиска при клике вне поля с поиском
    useEffect(()=>{
        const clickOutsideArea = (e) => {(
            setSearchInputShow(true),
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
                                surrenssies={props.currenssies}
                                urlShowAll={`страница-поиска?${search}&${props.role}`} // нужно правильно сложить строку
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
                    profile={props.profile}
                    stateOpen={stateOpen}
                    // openMenuRef={openMenuRef}
                    getKeyForAccess={getKeyForAccess}
                    logOut={logOut}
                />
                
                
                
                <span
                    className={'_icon-user'}
                    dataintro={"step7"}
                    name={'lk-menu'}
                >
                    {/* {!!notificationCount ? (
                        <div
                            className={classNames({
                            [style['header-buttons__badge']]: true,
                            [style['empty']]: !(!!notificationCount),
                            })}
                        >
                            {notificationCount}
                        </div>
                        ) : null} */}
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
                    >
                    </span>
                </Link>
            </div>



        </div>
    )
}

export default HeaderButtonsBottomLK;