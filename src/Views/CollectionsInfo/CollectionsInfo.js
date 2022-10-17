import React from 'react';
import style from './styles/collectionsinfo.module.scss';

const CollectiionsInfo = ({
    collections,
    sortCollection,
    title,
}) =>{

    return (
        <div className={style['info-collections__container']}>
        <ul
            className={style['info-collections__list']}
        >

            {
                collections.map((collect, index) => {
                    let res = collections[index].items.map(redeemed => redeemed.redeemed)
                    let enableBtn = res.filter(item => item === false ? true : false)
                    let colec = sortCollection(collect)
                    console.log('popupe = ',
                        {res},
                        {colec}
                    )
                    return (
                        <li
                            key={collect.id}
                            className={style['info-collections__item']}

                        >
                            <div className={style['item-title__text']}>
                                <h1>
                                    Сбор <strong>{index + 1}</strong>
                                </h1>
                                <h3 className={style['item-title__text-title']}>{title}</h3>
                            </div>

                            {/* <div className={style['info-collections__body-collectiion body-collectiion']}>
                                <div className={style['popup__item-title item-title-body']}>
                                    <div className={style['popup__item-title']}>
                                        <div className={style['item-title__badge']}>
                                            <AsyncLabels items={lables} />
                                        </div>
                                        <div className={style['item-title__image']}>
                                            <div style={{ backgroundImage: `url(${collections?.items[0]?.size?.image ? collections.items[0]?.size?.image : customImg})` }} className={style['popup__image']} />
                                        </div>
                                    </div>
                                    <div className={style['item-title__main-price']}>
                                        <AsyncPricesContainer
                                            prices={pricesHook}
                                            role_configuration={role_configuration}
                                            currency={currency}
                                            recommended_price={recommended_priceHook}
                                            in_cart_count={in_cart_countHook}
                                        />
                                    </div>
                                    <div className={style['prodpage-colors']}>
                                        <div className={style['prodpage-colors__name']}>
                                            <span>
                                                <Text text="color" />: &nbsp;
                                            </span>
                                            {collections?.items[0]?.size?.color_name}
                                            <div
                                                className={style['body-collectiion__condition']}
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    margin: '5px 0',
                                                    border: '1px solid #000',
                                                    borderRadius: '2px',
                                                    backgroundColor: collections?.items[0]?.size?.color,
                                                }}
                                            >.</div>
                                        </div>
                                    </div>
                                    <div className={style['body-collectiion__goods']}>
                                        <div className={style['body-collection__size']}>
                                            <ul
                                                className={style['prodpage-sizes__items']}
                                            >
                                                {colec.map((el, i) => {
                                                    return (
                                                        <li
                                                            key={v4(i * 2)}
                                                            className={style['prodpage-sizes__itemPopupe']}
                                                        >
                                                            <GxTooltip
                                                                content="Товары белым цветом доступны для завершения сбора"
                                                                placement="top"
                                                            >
                                                                <button
                                                                    // key={v4(i)}
                                                                    // disabled={classState.has(collections.id + (el.size.id + index * 444)) ? '' : el.redeemed}
                                                                    // type="button"
                                                                    // id={collections.id + (el.size.id + index * 444)}
                                                                    style={!el.redeemed ? { background: 'rgb(255, 255, 255)', color: 'rgb(0,0,0)' } : { background: 'rgb(79,79,79)', color: 'rgb(0, 0, 0)' }}
                                                                    // onClick={(e) => {
                                                                    //   addOrRemoveEl(e.target.id)
                                                                    // }}
                                                                    className={style['prodpage-sizes__size-buttonPopupe']}
                                                                >
                                                                    {el.size.title}
                                                                </button>
                                                            </GxTooltip>
                                                        </li>
                                                    );
                                                })}
                                            </ul>

                                        </div>
                                    </div>
                                </div>

                            </div> */}
                        </li>
                    )
                }
                )}
        </ul>
    </div>
    )
}

export default CollectiionsInfo;