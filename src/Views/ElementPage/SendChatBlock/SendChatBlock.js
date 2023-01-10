import React from 'react';
import { paperclip, send } from '../../../images';
import AddUploadFiles from '../../AddFiles';
import Button from '../../Button';
import Icon from '../../Icon';
import Input from '../../Input';

import style from './style/sendchatblock.module.scss'

const SendChatBlock = ({
    values,
    nameInput,
    nameFile,
    setFieldValue,
    checkFieldValue,
}) => {

    return (
        <div className={style['cabinet-orders-details__comment-send']}>
            <Input
                placeholder={'«Написать упаковщику»'}
                className={'cabinet-orders-details__comment-input'}
                name={ nameInput }
                value={values.message}
                onChange={e => {
                    let text = e.target.value;
                    setFieldValue('message', text)
                    if (!!text) { setFieldValue('activeBtnMessageForProduct', false) } else { setFieldValue('activeBtnMessageForProduct', true) }
                }
                }
            ></Input>

            <div className={style['cabinet-orders-details__comment-buttons']} >

                <AddUploadFiles
                    type = { 'file' }
                    name = { nameFile }
                    label = {''}
                    accept = { '.png, .jpg, .jpeg, .mp4'}
                    multiple = { false }
                    className = { 'cabinet-orders-details' }
                    countFiles = { values[nameFile] ?? 0}
                    setFieldValue = { setFieldValue }
                    onChange = { e => {
                        const files = e.currentTarget.files;
                        if (!!files?.length) { setFieldValue('activeBtnMessageForProduct', false) } else { setFieldValue('activeBtnMessageForProduct', true) }
                    }}
                    textButton = { <Icon src = { paperclip } width={20} height={20} />}
                    checkFieldValue = { checkFieldValue }
                />
                <Button
                    type={'submit'}
                    variant="text"
                    disabled={values.activeBtnMessageForProduct}
                >
                    <Icon src={send} width={20} height={20} />
                </Button>
            </div>
        </div>
    )
}

export default SendChatBlock;