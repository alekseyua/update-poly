import React from 'react';
import classNames from 'classnames';
import Text from '../../helpers/Text';
import Button from '../Button';

import style from './styles/index.module.scss';

const ProfileLevelData = ({
  level = '«Королева шоппинга»',
  name = 'Наталья Тюмченкова',
  progress = '900',
  
  openModalAddReview,
}) => {

  return (
    <section>
      {/* <div className={style['cabinet-form-block']}>
        <div className={style['cabinet-form-block__top']}>
          <h2 className={style['cabinet-form-block__heading']}>Мой статус по бонусной программе</h2>
        </div>
        <div className={style['cabinet-form-block__content']}>
          <p className={style['cabinet-reviews__name']}>{name}</p>
          <p className={style['cabinet-reviews__level']}>
            Участник уровня <span className={style['cabinet-reviews__level-boldup']}>{level}</span>.
            Скидка для данного статуса составляет{' '}
            <span className={style['cabinet-reviews__level-boldup']}>4%</span>. <br /> Вам не
            хватает 100 балла (-ов), чтобы получить свой следующий уровень.
            <br /> Скидка станет доступна через 20 дней (какое-то время модерации отзывов).
          </p>
          <p className={style['cabinet-reviews__counter']}>900 балла (-ов)</p>
          <div className={style['cabinet-reviews__rating']}>
            <div
              className={classNames({
                [style['cabinet-reviews__rating-circle']]: true,
                [style['cabinet-reviews__rating-circle-fill']]: true,
              })}
            ></div>
            <progress
              className={style['cabinet-reviews__rating-progress']}
              max="1000"
              value={progress}
            ></progress>
            <div className={style['cabinet-reviews__rating-circle']}></div>
          </div>
        </div>
      </div> */}
      <div className={style['cabinet-reviews__btnwrap']}>
        <Button onClick={openModalAddReview} variant={'cabinet_default'}>
          <Text text="add.review" />
        </Button>
      </div>
    </section>
  );
};

export default React.memo(ProfileLevelData);
