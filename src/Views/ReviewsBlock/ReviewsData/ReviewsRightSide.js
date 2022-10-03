import React from 'react';
import classNames from 'classnames';
import Raiting from '../../Raiting/RaitingView';
import style from '../styles/reviews.module.scss';
import Text from '../../../helpers/Text';
import BlockSpiner from '../../SpinnerWrapper';
const ReviewsRightSide = ({ reviews_statistic }) => {
  return (
    <div className={style['reviews__right-side-wrapper']}>
        {
          reviews_statistic?
          <div className={style['reviews__right-side-container']}>            
            <div className={style['reviews__indicator-star-wrapper']}>
              <Raiting
                className={style['reviews__rating-indicator']}            
                max={5}
                ActiveStar={reviews_statistic?.all_count_percent}
              ></Raiting>
              <span>{reviews_statistic?.all_count_percent.toFixed(2)} / 5</span>
            </div>
            <ul className={style['reviews__indicator-line-list']}>
              <li className={style['reviews__indicator-line-item']}>
                <p className={(style['reviews__indicator-description'])}>5 {Text({text: 'stars'})}</p>
                <div className={style['reviews__indicator-line-container']}>
                  <div className={style['reviews__indicator-line-gray']}></div>
                  <div
                    style={{ width: `${reviews_statistic['5_stars_percent']}%` }}
                    className={classNames({
                      [style['reviews__indicator-line-yelow']]: true,
                      //?! нет стиля
                      [style['reviews__indicator-line-yelow--five-stars']]: true,
                    })}
                  ></div>
                </div>
                <p className={style['reviews__indicator-counter']}>
                  {reviews_statistic['5_stars_count']}
                </p>
              </li>
              <li className={style['reviews__indicator-line-item']}>
                <p className={style['reviews__indicator-description']}>4 {Text({text: 'stars'})}</p>
                <div className={style['reviews__indicator-line-container']}>
                  <div className={style['reviews__indicator-line-gray']}></div>
                  <div
                    style={{ width: `${reviews_statistic['4_stars_percent']}%` }}
                    className={classNames({
                      [style['reviews__indicator-line-yelow']]: true,
                      [style['reviews__indicator-line-yelow--fore-stars']]: true,
                    })}
                  ></div>
                </div>
                <p className={style['reviews__indicator-counter']}>
                  {reviews_statistic['4_stars_count']}
                </p>
              </li>
              <li className={style['reviews__indicator-line-item']}>
                <p className={style['reviews__indicator-description']}>3 {Text({text: 'stars'})}</p>
                <div className={style['reviews__indicator-line-container']}>
                  <div className={style['reviews__indicator-line-gray']}></div>
                  <div
                    style={{ width: `${reviews_statistic['3_stars_percent']}%` }}
                    className={classNames({
                      [style['reviews__indicator-line-yelow']]: true,
                      [style['reviews__indicator-line-yelow--three-stars']]: true,
                    })}
                  ></div>
                </div>
                <p className={style['reviews__indicator-counter']}>
                  {reviews_statistic['3_stars_count']}
                </p>
              </li>
              <li className={style['reviews__indicator-line-item']}>
                <p className={style['reviews__indicator-description']}>2 {Text({text: 'stars'})}</p>
                <div className={style['reviews__indicator-line-container']}>
                  <div className={style['reviews__indicator-line-gray']}></div>
                  <div
                    style={{ width: `${reviews_statistic['2_stars_percent']}%` }}
                    className={classNames({
                      [style['reviews__indicator-line-yelow']]: true,
                      [style['reviews__indicator-line-yelow--two-stars']]: true,
                    })}
                  ></div>
                </div>
                <p className={style['reviews__indicator-counter']}>
                  {reviews_statistic['2_stars_count']}
                </p>
              </li>
              <li className={style['reviews__indicator-line-item']}>
                <p className={style['reviews__indicator-description']}>1 {Text({text: 'stars'})}</p>
                <div className={style['reviews__indicator-line-container']}>
                  <div className={style['reviews__indicator-line-gray']}></div>
                  <div
                    style={{ width: `${reviews_statistic['1_stars_percent']}%` }}
                    className={classNames({
                      [style['reviews__indicator-line-yelow']]: true,
                      [style['reviews__indicator-line-yelow--one-star']]: true,
                    })}
                  ></div>
                </div>
                <p className={style['reviews__indicator-counter']}>
                  {reviews_statistic['1_stars_count']}
                </p>
              </li>
            </ul>
          </div>
          :<BlockSpiner.SpinnerWrapper>
            <BlockSpiner.Spinner />
          </BlockSpiner.SpinnerWrapper>
        }
    </div>
  );
};

export default React.memo(ReviewsRightSide);
