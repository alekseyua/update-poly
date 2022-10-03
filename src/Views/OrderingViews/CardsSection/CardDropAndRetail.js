import React, { useState } from 'react';
import { categoryCard1} from '../../../images';
import Text from '../../../helpers/Text';
import CheckBox from '../../../Views/CheckBox';
import { Link } from 'react-router-dom';
import { ROLE } from '../../../const';

import style from '../styles/index.module.scss';

const CardDropAndRetail = ({
  currency,
  count,
  role,
  el, 
}) => {
console.log('CardDropAndRetail')
const id = el.id;
const [stateChecked, setStateChecked] = useState(false)
      
      const changeAgreement = (e) => {

      };
    
  return (

    // (role !== ROLE.WHOLESALE)?(

    //     <div className={style["order-card__wrapper"]}>
    //       <div className={style["order-card__inner"]}>

    //         <div className={style["order-card__imgage"]}>

    //           <div className={style["order-card__imgage-inner"]}>
    //             <Link 
    //               to={el.url}
    //             >
    //               <div className={style["order-card__img"]} style={ !!el?.product.image? {backgroundImage: `url(${el.product.image})` } : { backgroundImage: `url(${categoryCard1})` }}></div>
    //             </Link>
    //           </div>
    //         </div>

    //         <div className={style["order-card__content-card"]}>
    //           <Link     
    //             to={el.url}
    //           >
    //             <div className={style["order-card__content-card-title"]}>{el.product.title}</div>
    //           </Link>
    //           <div className={style["order-card__content-card-brand"]}>{el.product.brand}</div>

    //           <div className={style["order-card__content-card-info"]}>
    //             <div className={style["order-card__content-card-info-inner"]}>
    //               <div className={style["order-card__content-card-info-size"]}><span><Text text={'size'} />:&nbsp;</span> {el.product.size}</div>
    //               <div className={style["order-card__content-card-info-color"]}><span><Text text={'color'} />:&nbsp;</span> {el.product.color}</div>
    //               <div className={style["order-card__content-card-info-agree"]}>
    //                 {/* <GxTooltip
    //                   content="Заменить товар можно только на такой же, но в другом цвете и/или размере с соблюдением условия выкупа. Не забудьте в комментарии к товару указать свой выбор."
    //                   placement="top"
    //                   className={style['ordering_card__tooltip']}
    //                 > */}
    //                   <CheckBox
    //                     checked={stateChecked}
    //                     onGx-change={changeAgreement}
    //                     label={
    //                       <span className={style['order-card__content-card-change-text']}>Согласие на замену</span>
    //                     }
    //                   />
    //                 {/* </GxTooltip> */}
    //               </div>
    //             </div>

    //             <div className={style['order-card__content-card-price-wrapper']}>
    //               <div className={style["order-card__content-card-amount"]}>
    //                 <span><Text text="count" />:&nbsp;</span>{el.qty}&nbsp;шт.
    //               </div>
    //               <div className={style["order-card__content-card-price"]}><span> <Text text="price" />:&nbsp;</span><span><span className={style["order-card__content-card-price--color"]}>{el.price.toFixed(2)}</span>&nbsp;{currency}</span>
    //                 {el.old_price ? (
    //                   <span className={style['order-card__content-card-price--old']}>
    //                     {el.old_price} {currency}
    //                   </span>
    //                 ) : null}
    //               </div>
    //               <div className={style['order-card__content-card-price']}>
    //                 <span>
    //                   {' '}
    //                   <Text text="total" />
    //                   :&nbsp;
    //                 </span>
    //                 <span>
    //                   <span className={style['order-card__content-card-price--color']}>{(el.total_price).toFixed(2)}</span>&nbsp;
    //                   {currency}
    //                 </span>
    //               </div>
    //             </div>
    //           </div>


    //         </div>

    //       </div>

    //       <div className={style["order-card__content-card-inner-price"]}>
    //         <div className={style["order-card__content-card-amount-mob"]}><span><Text text="count" />:&nbsp;</span>{el.qty}&nbsp;шт.</div>
    //         <div className={style["order-card__content-card-price-mob"]}> <span> <Text text="price" />:&nbsp;</span><span><span className={style["order-card__content-card-price--color"]}>{el.price.toFixed(2)}</span>&nbsp;{currency}</span>
    //           {el.old_price ? (
    //             <span className={style['order-card__content-card-price--old']}>

    //               {el.old_price} {currency}
    //             </span>
    //           ) : null}       
    //         </div>
    //         <div className={style['order-card__content-card-price-mob']}>
    //           <span>
    //             {' '}
    //             <Text text="total" />
    //             :&nbsp;
    //           </span>
    //           <span>
    //             <span className={style['order-card__content-card-price--color']}>{(el.total_price).toFixed(2)}</span>&nbsp;
    //             {currency}
    //           </span>
    //         </div>
    //       </div>
    //     </div>


    //   ):(

        <div className={style["order-card__wrapper"]}>
          <div className={style["order-card__inner"]}>

            <div className={style["order-card__imgage"]}>

              <div className={style["order-card__imgage-inner"]}>
                <Link
                  to={el?.url? el.url : '/catalog' }
                >
                  <div className={style["order-card__img"]} style={!!el.image? {backgroundImage: `url(${el.image})` } : { backgroundImage: `url(${categoryCard1})` }}></div>
                </Link>
              </div>
            </div>

            <div className={style["order-card__content-card"]}>
              <div className={style["order-card__content-card-title"]}>{el.title}</div>
              <div className={style["order-card__content-card-brand"]}>{el.brand}</div>

              <div className={style["order-card__content-card-info"]}>
                <div className={style["order-card__content-card-info-inner"]}>
                  <div className={style["order-card__content-card-info-size"]}><span><Text text={'size'} />:&nbsp;</span> {el.size}</div>
                  <div className={style["order-card__content-card-info-color"]}><span><Text text={'color'} />:&nbsp;</span> {el.color}</div>
                  <div className={style["order-card__content-card-info-agree"]}>
                    {/* <GxTooltip
                      content="Заменить товар можно только на такой же, но в другом цвете и/или размере с соблюдением условия выкупа. Не забудьте в комментарии к товару указать свой выбор."
                      placement="top"
                      className={style['ordering_card__tooltip']}
                    > */}
                      <CheckBox
                        checked={stateChecked}
                        onChange={changeAgreement}
                        label={'Согласие на замену'}
                        classNameLabel={style['order-card__change-text']}
                          // <span className={style['ordering_card__change_text']}>Согласие на замену</span>
                      />
                    {/* </GxTooltip> */}
                  </div> 
                </div>

                <div className={style['order-card__content-card-price-wrapper']}>
                  <div className={style["order-card__content-card-amount"]}>
                    <span><Text text="count" />:&nbsp;</span>{el.qty}&nbsp;шт.
                  </div>
                  <div className={style["order-card__content-card-price"]}>
                    <span> <Text text="price" />:&nbsp;</span><span>
                      <span className={style["order-card__content-card-price--color"]}>{el.price.toFixed(2)}</span>&nbsp;{currency}</span>
                    {el.old_price ? (
                      <span className={style['order-card__content-card-price--old']}>
                        {el.old_price} {currency}
                      </span>
                    ) : null}
                  </div>

                   <div className={style['order-card__content-card-price']}>
                    <span>
                      {' '}
                      <Text text="total" />
                      :&nbsp;
                    </span>
                    <span>
                      <span className={style['order-card__content-card-price--color']}>{(el.total_price).toFixed(2)}</span>&nbsp;
                      {currency}
                    </span>
                  </div>
                </div>
              </div>


            </div>

          </div>

          <div className={style["order-card__content-card-inner-price"]}>
            <div className={style["order-card__content-card-amount-mob"]}>
              <span><Text text="count" />:&nbsp;</span>{el.qty}&nbsp;шт.
            </div>
            <div className={style["order-card__content-card-price-mob"]}> 
            <span> <Text text="price" />:&nbsp;</span><span><span className={style["order-card__content-card-price--color"]}>
              {el.price.toFixed(2)}</span>&nbsp;{currency}</span>
              {el.old_price ? (
                <span className={style['order-card__content-card-price-mob--old']}>
                  {el.old_price} {currency}
                </span>
              ) : null}
            </div>

               <div className={style['order-card__content-card-price-mob']}>
                <span>
                  {' '}
                  <Text text="total" />
                  :&nbsp;
                </span>
                <span>
                  <span className={style['order-card__content-card-price--color']}>{(el.total_price).toFixed(2)}</span>&nbsp;
                  {currency}
                </span>
              </div>
          </div>
        </div>

    )

    
  // );
};

export default React.memo(CardDropAndRetail);
