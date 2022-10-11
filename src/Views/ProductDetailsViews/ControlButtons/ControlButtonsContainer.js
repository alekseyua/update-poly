import React, { useState, useEffect } from 'react';
import Button from '../../Button';
import ControlButtons from './ControlButtons';
import classNames from 'classnames';

import style from './style/controlbuttons.module.scss';
import { useStoreon } from 'storeon/react';

/**
 * 
 * @param {
 * 1) при добавлении товара цвет кнопки кратковременно меняет цвет на зелёный
 * 2) иконка с кнопки клонируется и перемещаеться к хэдер меню и там меняеться численость
 * 3) 
 * } param0 
 * @returns 
 */

const ControlButtonsContainer = ({
    in_stock_count,
    is_collection,
    in_cart_count,
    is_in_stock,
    productId,
    modalView,
    role,
    url,

}) =>{
    const { dispatch } = useStoreon();
    const [ countInBtn, setCountInBtn ] = useState();
    const [ stateInStockeBtn, setStateInStockeBtn ] = useState(false);
    const [ changeColorBtn, setChangeColorBtn ] = useState({
        red: false,
        green: false
    })

    useEffect(()=>{ 
      if(is_in_stock){
        if(in_stock_count < 1){
          setStateInStockeBtn(true)
        } else {
          setStateInStockeBtn(false)
        }
        if (in_stock_count > in_cart_count){
          setStateInStockeBtn(false)
        }else{
          setStateInStockeBtn(true)
        }
      }else{
        setStateInStockeBtn(false)
      }
    },[is_in_stock,in_stock_count,in_cart_count])

    const closeModal = () => {
      dispatch('setModalState',{show: false})
    }

    const cloneCart = (e) =>{
        let cartIcon
        if(e.target.children[0]){
          cartIcon = e.target.children[0]
        }else{
          cartIcon = e.target.offsetParent.children[0].children[1].firstChild
        }
        // console.log({e: e.target.offsetParent.children[0].children[1].firstChild})
        const cloneIcon = cartIcon.cloneNode(true)
        const cloneBackgroundImage = cartIcon.style.backgroundImage;
        const cloneIconWidth = cartIcon.offsetWidth;//ширина изображения
        const cloneIconHeight = cartIcon.offsetHeight;// высота изображения
        const cloneIconTop = cartIcon.getBoundingClientRect().top;// позиция изображения на странице от верха
        const cloneIconLeft = cartIcon.getBoundingClientRect().left;//позиция изображения на странице от левого края
        
        //присваиваем стили нашей картинке
        // cloneIcon.setAttribute('class', '_flyImage');
        cloneIcon.classList.add('_flyImage')
      cloneIcon.style.cssText = `
        left: ${cloneIconLeft}px;
        top:  ${cloneIconTop}px;
        width: ${cloneIconWidth}px;
        height: ${cloneIconHeight}px;
      `
      //добавляем клон на страницу
      document.body.append(cloneIcon)
      // получаем координаты карзины по id 'cart-id'
      const getCartId = document.querySelector('#cart-id')
      const getCartIdTop = getCartId.getBoundingClientRect().top;// позиция изображения на странице от верха
      const getCartIdLeft = getCartId.getBoundingClientRect().left;// позиция изображения на странице от левого края
      
      console.log('data button = ',
          {cloneIcon},
          {getCartId}
      )
      cloneIcon.style.cssText = `
        left: ${getCartIdLeft}px;
        top:  ${getCartIdTop}px;
        background-image: ${cloneBackgroundImage};
        width: 0px;
        height: 0px;
        opacity: 0;
        transform: scale(.5)
      `
      const timer = setTimeout(() => {
        cloneIcon.remove()
        return () => clearTimeout(timer)
      }, 4000)
    }
  
    //******************************************************************************************************* */
    const addToCartProduct = (count, isRemoved = false, productId) => {

      // console.log('add to cart = ',
      // {count},
      // {isRemoved},
      // {productId}
      // )
      const params = {
        productId,
        count,
      }
      dispatch('addToCart', params)
    //  // if (role === ROLE.UNREGISTRED){
  
    //     if(statuStorage === 0){
    //     const params = {
    //         path: 'authorization',
    //         success: null,
    //         fail: 'Что бы воспользоваться всеми возможностями сотрудничества, необходимо зарегистрироваться',
    //       }
    //       dispatch('warrning/set', params)
    //     }
    //     if(statuStorage === 2){
    //       params = {
    //         path: 'registration',
    //         success: null,
    //         fail: 'Вам отказано в регистрации, пользование сайтом ограничено',
    //       }
    //       dispatch('warrning/set', params)
    //     }
    //     // history.push('authorization')
    //   // }else{
    //     let idProductStorage = null;
    //     if (checkLocalStorage('productId')){
    //       idProductStorage = +localStorage.getItem('productId');
    //     }
      
    //     (count === 1) ? setChangeColorBtn({ red: false, green: true }) : null;
    //     (count === -1) ? setChangeColorBtn({ red: true, green: false }) : null;
    //     const openModalSucces = (idProductStorage !== productId) ? true : false;
    //     let countInCart;
    //     countInCart = collections? sizes.lenght : count
    //     countInCart === undefined? countInCart = 0 : countInCart = collections? sizes.lenght : count;
    //     dispatch('stateCountCart/add', { ...stateCountCart, in_cart: stateCountCart.in_cart + countInCart})
    //     count = countInBtn + count;
    //     setCountInBtn(count)
    //     addToCart({ count, openModalSucces });
    //   // }
    };
  
    useEffect(()=>{
      in_cart_count !== countInBtn ? setCountInBtn(in_cart_count) : null
    },[in_cart_count])
  
    //*******************меняем стиль на кнопке зелёный или красный*** проверено работает***************************************** */
    const [colorBtnClick, setColorBtnClick] = useState('prodpage-control-buttons__indicator');
    useEffect(() => {
      let styleColor = (classNames({
        [style['prodpage-control-buttons__indicator--color__red']]: changeColorBtn.red,
        [style['prodpage-control-buttons__indicator--color__green']]: changeColorBtn.green,
      })
      )
      setColorBtnClick(styleColor)
    }, [changeColorBtn.red, changeColorBtn.green])
  
    //******************************************************************************************************* */
    const linkToProductPage = (url, modalView) => {
      if (!modalView) return null;
      return (
        <Button href={`/${url}`} full variant={'catalog-link-transparent__modal'} onClick = {closeModal}>
          перейти на страницу товара
        </Button>
      );
    };


    return (
        <ControlButtons
          linkToProductPage = { linkToProductPage }
          stateInStockeBtn = { stateInStockeBtn }
          addToCartProduct = { addToCartProduct }
          in_cart_count = { in_cart_count }
          colorBtnClick = { colorBtnClick }
          is_collection = { is_collection }
          countInBtn = { countInBtn }
          modalView = { modalView } 
          productId = { productId }
          cloneCart = { cloneCart }
          role = { role }
          url = { url }
        />
    )
}

export default ControlButtonsContainer;