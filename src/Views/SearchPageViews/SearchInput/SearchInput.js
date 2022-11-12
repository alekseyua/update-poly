import React from 'react';
import style from './searchinput.module.scss';
import Input from '../../Input/Input';
import { useStoreon } from 'storeon/react';

const SearchInput = ({inputValue, searchInputShow, handlerChangeValue, handleClickSearchRoot, ...props}) => {
    
    return (
            <Input
                value={inputValue}
                type={'text'}
                name={'input-search'}
                className={style['input-search']}
                placeholder={'Поиск'}
                // autofocus={searchInputShow}
                autofocus
                onChange={handlerChangeValue}
                //  autocomplete={'off'}
                //  variant={'large'}
                //  helpText={''}
                //  label={''}
                //  placeholder={Text({ text: 'search' })}
                //  inputmode={'search'}
                //  clearable
                //  ref={inputRef}
             >
                <span 
                    className={style['input-search__close']}
                    onClick={handleClickSearchRoot}
                    name={'search__close'}
                ></span>           
             </Input>

    )
}

export default SearchInput;