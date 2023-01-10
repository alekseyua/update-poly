import React from 'react';
import Text from '../../../helpers/Text';
import NotificationsViews from '../../../Views/NotificationsViews';
import Pagination from '../../../Views/Pagination';
import Title from '../../../Views/Title';
import BlockSpinner from '../../../Views/SpinnerWrapper';
import NoProducts from '../../../Views/ProductDetailsViews/InfoBlockProducts';
import DefaultEmptyOrder from './DefaultEmptyOrder';
import Offset from '../../../Views/Offset';

const Notifications = ({
    heandlerCheckAllNotice,
    stateActiveCheckNotice,
    setAllCheckEnableChange,
    allCheckEnableChange,
    heandlerCheckNotice,
    changePaginations,
    heandlerReedNotic,
    heandlerDelNotic,
    isLoadingAction,
    setCheckEnable,
    notifications,
    checkEnable,
    isLoading,



}) => {

    return (
        <React.Fragment>
            <Title variant={'cabinet__heading'} type={'h3'} >
                {Text({ text: 'notifications' })}
            </Title>

            <NotificationsViews.Wrapper>
                <NotificationsViews.SubText>
                    В данном разделе доступна история всех уведомлений и писем от нашей команды
                </NotificationsViews.SubText>
                <NotificationsViews.Header
                    heandlerReedNotic={heandlerReedNotic}
                    heandlerDelNotic={heandlerDelNotic}
                    heandlerCheckAllNotice={heandlerCheckAllNotice}
                    stateActiveCheckNotice={stateActiveCheckNotice}
                />
                {
                    isLoadingAction?
                                <BlockSpinner.Spinner  sizeWidth = {30} sizeHeight = {30} slot={'absolute-center'} />
                        : null
                }
                {
                    isLoading ?
                        !!notifications.results.length?
                            notifications.results.map((el) => {
                                return (
                                    <NotificationsViews.Item
                                        key={el.id}
                                        setAllCheckEnableChange={setAllCheckEnableChange}
                                        allCheckEnableChange={allCheckEnableChange}
                                        heandlerCheckNotice={heandlerCheckNotice}
                                        isRead={el.is_read}
                                        date={el.created_at}
                                        message={el.message}
                                        setCheckEnable={setCheckEnable}
                                        selectItemsNotice={notifications.selectItemsNotice}
                                        el={el}
                                    />
                                );
                            })
                            : <Title variant={'lk-message'} type={'h1'}>
                                <Offset offset={20} />
                                У Вас нет ни одного уведомления
                            </Title>                                    
                        : <BlockSpinner.SpinnerWrapper>
                         <BlockSpinner.SpinnerCenter>
                             <BlockSpinner.Spinner  sizeWidth = {30} sizeHeight = {30} />
                         </BlockSpinner.SpinnerCenter>
                     </BlockSpinner.SpinnerWrapper>
                }

            </NotificationsViews.Wrapper>
            <Pagination allCount={notifications.count} count={30} handlerChangePaginations={changePaginations} />
        </React.Fragment>
    )
}

export default Notifications