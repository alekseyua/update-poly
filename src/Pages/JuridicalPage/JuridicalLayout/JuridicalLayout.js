import React from 'react';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import Block from '../../../Views/GridContainerBlock';
import InformationViews from '../../../Views/InformationViews';
import Spinner from '../../../Views/SpinnerWrapper/Spinner';
import SpinnerWrapper from '../../../Views/SpinnerWrapper/SpinnerWrapper';
import Title from '../../../Views/Title';
import { ROLE } from '../../../const'
import Text from '../../../helpers/Text';

import style from './styles/juridical.module.scss';


const JuridicalLayout = ({ breadcrumbs, title, front_admin, components, role, heandlerPolicy }) => {


    return (
        <Block.Container>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            {
                title ?
                    <InformationViews.PaymentsConteiner>
                        <Title variant={'information-payments__title'} type={'h1'}>
                            {title}
                            {front_admin ? <Settings nameComponent={'howWorkSite'} /> : null}
                        </Title>
                        <InformationViews.HowToWrapper>
                            <InformationViews.BlockHowTo>
                                <InformationViews.ContainerMin>
                                    <InformationViews.PaymentsDescription>
                                        {
                                            components ?
                                                components.map(el => {
                                                    return (
                                                        (el.id === 26 && role === ROLE.UNREGISTRED) ?
                                                            el.children.map((item, i) => {
                                                                const position = `juridical-block--${item.title}`;
                                                                return (
                                                                    <div
                                                                        key={el.id * i}
                                                                        className={style[position]}
                                                                    >
                                                                        <div className={style['juridical-block__left']} dangerouslySetInnerHTML={{ __html: item.content }}></div>

                                                                        <div className={style['juridical-block__right']}>
                                                                            <div className={style['juridical-block__image']}>
                                                                                {item.image !== '#' ? <img src={item.image} /> : null}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                            : (el.id === 24 && role === ROLE.DROPSHIPPER) ?
                                                                el.children.map((item, i) => {
                                                                    const position = `juridical-block--${item.title}`;
                                                                    return (
                                                                        <div
                                                                            className={style[position]}
                                                                            key={el.id * i}
                                                                        >
                                                                            <div className={style['juridical-block__left']} dangerouslySetInnerHTML={{ __html: item.content }}></div>

                                                                            <div className={style['juridical-block__right']}>
                                                                                <div className={style['juridical-block__image']}>
                                                                                    {item.image !== '#' ? <img src={item.image} /> : null}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                                : (el.id === 25 && role === ROLE.WHOLESALE) ?
                                                                    el.children.map((item, i) => {
                                                                        const position = `juridical-block--${item.title}`;
                                                                        return (
                                                                            <div
                                                                                key={el.id * i}
                                                                                className={style[position]}
                                                                            >
                                                                                <div className={style['juridical-block__left']} dangerouslySetInnerHTML={{ __html: item.content }}></div>

                                                                                <div className={style['juridical-block__right']}>
                                                                                    <div className={style['juridical-block__image']}>
                                                                                        {item.image !== '#' ? <img src={item.image} /> : null}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                    : (el.id === 23 && role === ROLE.RETAIL) ?
                                                                        el.children.map((item, i) => {
                                                                            const position = `juridical-block--${item.title}`;
                                                                            return (
                                                                                <div
                                                                                    className={style[position]}
                                                                                    key={el.id * i}
                                                                                >
                                                                                    <div className={style['juridical-block__left']} dangerouslySetInnerHTML={{ __html: item.content }}></div>

                                                                                    <div className={style['juridical-block__right']}>
                                                                                        <div className={style['juridical-block__image']}>
                                                                                            {item.image !== '#' ? <img src={item.image} /> : null}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                        : null
                                                    )
                                                })
                                                : <SpinnerWrapper>
                                                    <Spinner />
                                                </SpinnerWrapper>
                                        }

                                    </InformationViews.PaymentsDescription>
                                    <InformationViews.PaymentsDescription>
                                        <div className={style['information-exchange__wrapper']}>
                                            <div onClick={heandlerPolicy} data-name='policy' className={style['information-exchange__link']}>
                                                {
                                                    Text({ text: 'privacy-policy' })
                                                }
                                            </div>

                                            <div onClick={heandlerPolicy} data-name='public_offer_1' className={style['information-exchange__link']}>
                                                {
                                                    Text({ text: 'terms-of-use' })
                                                }
                                            </div>

                                            <div onClick={heandlerPolicy} data-name='terms' className={style['information-exchange__link']}>
                                                {
                                                    Text({ text: 'terms-of-use-dilivery' })
                                                }
                                            </div>

                                            <div onClick={heandlerPolicy} data-name='public_offer_2' className={style['information-exchange__link']}>
                                                {
                                                    Text({ text: 'terms-of-use-opt' })
                                                }
                                            </div>

                                            <div onClick={heandlerPolicy} data-name='statement_performance' className={style['information-exchange__link']}>
                                                {
                                                    Text({ text: 'poor-quality' })
                                                }
                                            </div>
                                            {front_admin ? <Settings nameComponent={'InformationJuridical'} /> : null}

                                        </div>
                                    </InformationViews.PaymentsDescription>
                                </InformationViews.ContainerMin>
                            </InformationViews.BlockHowTo>
                        </InformationViews.HowToWrapper>
                    </InformationViews.PaymentsConteiner>
                    : <SpinnerWrapper>
                        <Spinner size={100} />
                    </SpinnerWrapper>
            }
        </Block.Container>
    )
}

export default JuridicalLayout;