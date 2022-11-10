import Grid from './Grid';
import BlockCenter from './BlockCenter';
import WrapperBlock from './WrapperBlock';
import Container from './Container';
import Row from './Row/Row';
import Coll from './Coll/Coll';
// блоки для создания сетки корзины и заказа
import CollPageLeft from './CollPageLeft/CollPageLeft';
import CollPageRight from './CollPageRight/CollPageRight';
import CollPageContainer from './CollPageContainer/CollPageContainer';
// блоки для создания сетки личного кабинета
import GridPageLK from './GridPageLK/GridPageLK';
import GridPageLeftLK from './GridPageLeftLK/GridPageLeftLK';
import GridPageRightLK from './GridPageRightLK/GridPageRightLK';
// форма обратной связи feedback
import BlockFeedback from './BlockFeedback/BlockFeedback';
// форма пополнить баланс
import BlockPayment from './BlockPayment/BlockPayment';
// контейнер для сообщений в попапах
import BlockMessage from './BlockMessage/BlockMessage';
// форма для добавления адресса доставки
import BlockAddAddressContainer from './BlockAddAddress/BlockAddAddressContainer';
import BlockAddAddressContainerPhone from './BlockAddAddress/BlockAddAddressContainerPhone';
import BlockAddAddressLeftSide from './BlockAddAddress/BlockAddAddressLeftSide';
import BlockAddAddressRightSide from './BlockAddAddress/BlockAddAddressRightSide';
import BlockAddAddressCell from './BlockAddAddress/BlockAddAddressCell';
import BlockAddAddressAdditionalInfo from './BlockAddAddress/BlockAddAddressAdditionalInfo';
import BlockAddAddressContainerButton from './BlockAddAddress/BlockAddAddressContainerButton';

// блок обёртка для показа карточек товаров в сборе
import BlockContainerCollections from './BlockContainerCollections/BlockContainerCollections';


export default {
    BlockContainerCollections,

    BlockAddAddressContainerButton,
    BlockAddAddressContainerPhone,
    BlockAddAddressRightSide,
    BlockAddAddressContainer,
    BlockAddAddressLeftSide,
    BlockAddAddressCell,
    BlockAddAddressAdditionalInfo,

    BlockMessage,
    BlockPayment,
    BlockFeedback,

    GridPageLK,
    GridPageLeftLK,
    GridPageRightLK,

    CollPageContainer,
    CollPageLeft,
    CollPageRight,

    Container,
    Grid,
    WrapperBlock,
    BlockCenter,
    Row,
    Coll
}