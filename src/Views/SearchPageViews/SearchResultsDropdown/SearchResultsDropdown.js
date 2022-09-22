import React from 'react';
import { Link } from 'react-router-dom';
import SearchResult from './SearchResult/SearchResult';
import classNames from 'classnames';

import style from './searchresultsdropdown.module.scss';

const SearchResultsDropdown = (props) => {
//const {currenssies, urlShowAll, urlNothingSearch} = props

    return (
        <div className={style['search-result__dropdown']}>
            <ul className={style['search-result__list']}>
                {
                    props.search.map((el, i) => {
                        return (
                            <li className={style['search-result__items']}
                                key={`search_id-${el.id}`}
                            >
                                <SearchResult
                                    title={el.title}
                                    article={el.article}
                                    prices={el.prices}
                                    images={el.images}
                                    url={el.url}
                                    currenssies={props.currenssies}
                                />
                            </li>
                        )
                    })
                }
                {props.search.length > 0 ? (
                        <div
                            className={classNames({
                                [style['search-result__items']]: true,
                                [style['search-result__items-all']]: true,
                            })}
                        >
                            <Link
                                to={props.urlShowAll}
                            >
                                Показать всё
                            </Link>
                        </div>
                ) : (
                    <>
                        {true ?
                            <div className={classNames({
                                [style['search-result__items']]: true,
                                [style['search-result__items-all']]: true,
                            })}
                            >
                                <Link to={props.urlNothingSearch}>
                                    Ничего не найдено
                                </Link>
                            </div>
                            : null}
                    </>
                )}
            </ul>
        </div>
    )
}

export default SearchResultsDropdown;