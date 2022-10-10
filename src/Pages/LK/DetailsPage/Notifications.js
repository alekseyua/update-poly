import React from 'react';
import Text from '../../../helpers/Text';
import NotificationsViews from '../../../Views/NotificationsViews';
import Pagination from '../../../Views/Pagination';
import Title from '../../../Views/Title';

const Notifications = ({

    notifications,
    heandlerReedNotic,
    heandlerDelNotic,
    heandlerCheckAllNotice,
    stateActiveCheckNotice,

    setAllCheckEnableChange,
    allCheckEnableChange,
    setCheckEnable,
    checkEnable,
    heandlerCheckNotice,



    changePaginations,
    activePage,
    count = 30,
}) => {

    return(
        <React.Fragment>
            <Title variant={'cabinet__heading'} type={ 'h3' } >
                {Text({text: 'notifications'})}
            </Title>

            <NotificationsViews.Wrapper>
            <NotificationsViews.SubText>
                В данном разделе доступна история всех уведомлений и писем от нашей команды
            </NotificationsViews.SubText>
            <NotificationsViews.Header 
                heandlerReedNotic={heandlerReedNotic} 
                heandlerDelNotic={heandlerDelNotic} 
                heandlerCheckAllNotice = { heandlerCheckAllNotice }
                stateActiveCheckNotice = { stateActiveCheckNotice }
            />
            {notifications.results.map((el) => {
                return (
                <NotificationsViews.Item
                    key={el.id}
                    setAllCheckEnableChange={setAllCheckEnableChange}
                    allCheckEnableChange={allCheckEnableChange}
                    heandlerCheckNotice = { heandlerCheckNotice }
                    isRead={el.is_read}
                    date={el.created_at}
                    message={el.message}
                    setCheckEnable={setCheckEnable}
                    selectItemsNotice={ notifications.selectItemsNotice}
                    el={el}
                />
                );
            })}

            </NotificationsViews.Wrapper>
            <Pagination allCount={notifications.count} count={30} handlerChangePaginations={changePaginations} />
        </React.Fragment>
    )
}

export default Notifications