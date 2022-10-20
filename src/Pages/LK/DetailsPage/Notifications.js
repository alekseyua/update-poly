import React from 'react';
import Text from '../../../helpers/Text';
import NotificationsViews from '../../../Views/NotificationsViews';
import Pagination from '../../../Views/Pagination';
import Title from '../../../Views/Title';
import BlockSpinner from '../../../Views/SpinnerWrapper';

const Notifications = ({
    notificationsPrifile,
    heandlerReedNotic,
    heandlerDelNotic,
    notifications,

    heandlerCheckAllNotice,
    stateActiveCheckNotice,

    setAllCheckEnableChange,
    allCheckEnableChange,
    setCheckEnable,
    checkEnable,
    heandlerCheckNotice,



    changePaginations,
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
                heandlerReedNotic = { heandlerReedNotic } 
                heandlerDelNotic = { heandlerDelNotic } 
                heandlerCheckAllNotice = { heandlerCheckAllNotice }
                stateActiveCheckNotice = { stateActiveCheckNotice }
            />
            {
                !!notificationsPrifile && notifications.results.length > 0 ?

                    notifications.results.map((el) => {
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
                    })
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