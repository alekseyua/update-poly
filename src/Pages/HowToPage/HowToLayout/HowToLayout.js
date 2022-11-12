import React from 'react';
import Block from '../../../Views/GridContainerBlock';
import WorldStandardSizesChart from '../../../Views/WorldStandardSizesChart';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import InformationViews from '../../../Views/InformationViews';
import BlockSpinner from '../../../Views/SpinnerWrapper';
import Text from '../../../helpers/Text';
import Title from '../../../Views/Title';

const HowToLayout = ({ title, content, openVidjet, breadcrumbs, slug }) => {
    return (

        <Block.Container>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <InformationViews.PaymentsConteiner>
                <Title variant={'information-payments__title'} type={'h1'}>
                    {
                        !!!title ?
                            Text({ text: 'how-to' })
                            : title
                    }
                </Title>
                {
                    !!content ?
                        <InformationViews.HowToWrapper>
                            <InformationViews.BlockHowTo>
                                <InformationViews.HowToDecription content={content} />
                                <InformationViews.ImageWoman />
                            </InformationViews.BlockHowTo>
                            {/* таблица */}
                            <WorldStandardSizesChart slug={slug} />
                            {/* подпись под таблицей */}
                            <InformationViews.HowToDecription modificatorClass={'small'}>
                                Приведенные данные в таблице являются ориентиром для самостоятельного определения
                                своего размера согласно мировым стандартам. Реальные размеры товаров, представленных
                                на сайте, могут отличаться. Если Вы затрудняетесь с определением своего размера,
                                просьба написать нам через форму обратной связи.
                            </InformationViews.HowToDecription>

                            {/* форма обратной связи */}
                            <InformationViews.SubTitle>Форма обратной связи</InformationViews.SubTitle>
                            <InformationViews.HowToDecription>
                                Вы можете написать нам письменное обращение или оставить отзыв о работе сайта или
                                компании. <br />
                                Наши сотрудники отвечают в течение 2 дней.
                            </InformationViews.HowToDecription>
                            <InformationViews.Link is_link={false} onClick={openVidjet}>
                                Написать нам
                            </InformationViews.Link>
                        </InformationViews.HowToWrapper>
                        : <BlockSpinner.SpinnerWrapper>
                            <BlockSpinner.Spinner size={80} />
                        </BlockSpinner.SpinnerWrapper>
                }
            </InformationViews.PaymentsConteiner>
        </Block.Container>
    )
}

export default HowToLayout;