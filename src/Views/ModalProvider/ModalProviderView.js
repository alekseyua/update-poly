import React, { useEffect, useState } from 'react';
import Text from '../../helpers/Text';
import { spinnerCart, spin } from '../../images';
import Button from '../Button';
import Icon from '../Icon/Icon';
import Title from '../Title';

import style from './styles/modalProviderView.module.scss';

const ModalProviderView = ({content, show, action = null, title = <Text text={'admin'}/>, children, onClickCancel = null, onClick, iconImage = null, closeModal, ...props}) => {
    const [ showPopup, setShowPopup ] = useState({
        container : 'modal-provider__container',
        popup: 'modal-provider__body'
    });

/**
 * !params(
 *  ? content - содержимое сообщение попапа
 *  ? action -  title["button1", "button2"] - может включать в себя до 2-х кнопок с действиями
 *  ? title - информационное имя попапа
 *  ? iconImage - иконка в попапе
 * )
 */

    useEffect(()=>{

        if (show) {
            setShowPopup({
                container: 'modal-provider__container--show',
                popup: 'modal-provider__body--show'
            })
        }else{
            setShowPopup({
                container : 'modal-provider__container',
                popup: 'modal-provider__body'
            })
        }

    },[ show ])

    return(<div 
            className={style[showPopup.container]}
        >
            <div
                className={style[showPopup.popup]}
                // style={{
                    //     width: 
                    // }}
                    >
                <div 
                    className={style['modal-provider__close']}
                    onClick={closeModal}
                ></div>
                {
                    iconImage? 
                        <div className={style['modal-provider__icon']} >
                            <Icon src={iconImage} className={style['modal-provider__success-error']} /> 
                        </div>                        
                        : null
                }

                
                {
                    content?
                    <>
                        <div className={style['modal-provider__title']} ><Title type={'h1'}>{title}</Title></div>
                        <div className={style['modal-provider__content']}>
                                {content}
                        </div>
                    </>
                        : <Icon src={spinnerCart} className={style['modal-provider__spinner']} />
                }
               
                {
                    action?
                        <div className={style['modal-provider__action-container']}>
                            <Button 
                                onClick={onClick}
                                variant={'black_btn_full_width'}
                            >
                                {action.title[0]}
                            </Button>

                            {
                                onClickCancel?
                                    <Button 
                                        onClick={onClickCancel}
                                        variant={'black_btn_full_width'}
                                    >
                                        {action.title[1]}
                                    </Button>
                                    : null
                            }
                        </div>
                        : null
                }
                    
            </div>
            {children}
        </div>
    )
}

export default ModalProviderView;