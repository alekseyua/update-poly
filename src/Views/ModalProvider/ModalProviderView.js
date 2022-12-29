import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Text from '../../helpers/Text';
import Button from '../Button';
import Icon from '../Icon/Icon';
import Title from '../Title';

import styleModal from './styles/modalProviderView.module.scss';

/**
 *  @param {
 *       @content - содержимое сообщение попапа
 *       @action -  title["button1", "button2"] - может включать в себя до 2-х кнопок с действиями
 *       @title - информационное имя попапа
 *       @iconImage - иконка в попапе
 *       @onClickCancel - кнопка закрытия ()=>{}
 *       @closeModal  - кнопка закрытия крестик ()=>{} 
 *  } 
 *  @return
 */
const ModalProviderView = ({
    content,
    show,
    action = null,
    title = <Text text={'admin'} />,
    children,
    onClickCancel = null,
    onClick,
    iconImage = null,
    closeModal,
    addClass,
    style,
    ...props }) => {

    const [showPopup, setShowPopup] = useState({
        container: 'modal-provider__container',
        popup: 'modal-provider__body'
    });

    useEffect(() => {

        if (show) {
            setShowPopup({
                container: 'modal-provider__container--show',
                popup: 'modal-provider__body--show'
            })
        } else {
            setShowPopup({
                container: 'modal-provider__container',
                popup: 'modal-provider__body'
            })
        }

    }, [show])

    return (<div
        className={styleModal[showPopup.container]}
    >
        <div
            className={classNames({
                [styleModal[showPopup.popup]]: true,
                [styleModal['modal-provider__spinner-loader']]: !!!content,
                [styleModal[addClass]]: !!addClass
            })
            }
            style={style}
        >
            <div
                className={styleModal['modal-provider__close']}
                onClick={closeModal}
            ></div>
            {
                iconImage ?
                    <div className={styleModal['modal-provider__icon']} >
                        <Icon src={iconImage} className={styleModal['modal-provider__success-error']} height={40} width={40} />
                    </div>
                    : null
            }


            {
                content ?
                    <>
                        {
                            !!title ?
                                <div className={styleModal['modal-provider__title']} ><Title type={'h1'}>{title}</Title></div>
                                : null
                        }
                        <div className={styleModal['modal-provider__content']}>
                            {content}
                        </div>
                    </>
                    // : <Icon src={spinnerCart2} className={styleModal['modal-provider__spinner']} height={70} width={70}/>
                    : <h1 id="spinner" className={styleModal['modal-provider__spinner-text']}></h1>

            }

            {
                action ?
                    <div className={styleModal['modal-provider__action-container']}>
                        <Button
                            onClick={onClick}
                            variant={'black_btn_full_width-modal'}
                        >
                            {action.title[0]}
                        </Button>

                        {
                            onClickCancel ?
                                <Button
                                    onClick={onClickCancel}
                                    variant={'black_btn_full_width-modal'}
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