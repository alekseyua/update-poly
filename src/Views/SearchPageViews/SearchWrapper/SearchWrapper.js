import React from 'react';
import classNames from 'classnames';

import style from './searchwrapper.module.scss';


const SearchWrapper = (props) => {    

    return (
        <div
            className={classNames({
                [style['header-buttons__search-wrapper']]: true,
                [style['header-buttons__search-wrapper--fade-in']]: props.openSearchInput,
            })}        
        >
            <div                
                className={classNames({
                    [style['header-buttons__search-wrapper__bg']]: true,
                    [style['header-buttons__search-wrapper__bg--active']]: props.openSearchInput,
                })}
            ></div>
            {props.children}
        </div>
    )
}

export default SearchWrapper;