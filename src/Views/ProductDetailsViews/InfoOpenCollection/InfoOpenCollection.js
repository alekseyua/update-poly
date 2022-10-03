import React from "react";
import Text from "../../../helpers/Text";
import { ROLE } from "../../../const";

import style from './styles/infoopencollection.module.scss';

const InfoOpenCollection = ({
    collections,
    status,
    title,
    handlerOpenListCollection,
}) => {

  return (
    <React.Fragment>
      {/* кнопка  Иформация по открытым сборам*/}
      {
        status !== 0 || status !== 2 ? (
          !!collections.length?
            (<div className={style['prodpage-collections__container']}>
                <div
                  onClick={() => handlerOpenListCollection(collections, title)} // открыть попап со страничкой по зборам
                  className={style['prodpage-collections__button']}
                >
                  Иформация по открытым сборам
                </div>
            </div>
            ) : null)
          : null
      }
    </React.Fragment>
  )
}

export default InfoOpenCollection;