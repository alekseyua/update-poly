import React from 'react';
import Button from '../Button';
import ToolTip from '../ToolTip';

import './ordercar.scss';

const OrderCar = ({
	values,
	enabled,
	styleCar,
	setStyleCar,
	numberCurrentOrderForAddProduct,

	statusFildValue,
	handlerSubmitOrder,
}) => {
	
		const lifehack = () =>{
			setStyleCar('orderCar animate');
			const timerTimeout = setTimeout(()=>{
				handlerSubmitOrder(values)
			},7000)
		}
console.log('styleCar',styleCar)
    return(
		<ToolTip
			content = {
				!!numberCurrentOrderForAddProduct?
					`Добавить товары в заказ № ${numberCurrentOrderForAddProduct}`
					:!!!values?.payment_methods? 
						`У Вас не выбран метод оплаты` 
						: !!!values?.variant? 
							`У Вас не выбран способ доставки` 
							: !!!values?.selectedAdress?
								`У Вас не выбран адрес доставки` 
								: !!!values?.agree_personal_data?
									`Отсутствует согласие на оформление заказа и с провами возрата`
									: `Мы готовы оформить заказ`

			}
			placement={'top'}
			local = {'top-center'}
			trigger={!(styleCar === 'orderCar')?'hover': ''}
		>
			<div 
				className = {'oder-main'}
				style = {{
					pointerEvents: 'none'
				}}
			>
				<Button
					disabled = { enabled }
					className={ styleCar }
					onClick = { (styleCar !== 'orderCar animate')? ()=>lifehack() : null }
				>	
					{
						!!numberCurrentOrderForAddProduct? 
							(
								<strong className = { 'default' } >{'Добавить товар в заказ'}</strong>
							) : (
								<strong className = { 'default' } >{!enabled ? 'ОФОРМИТЬ ЗАКАЗ НА ВЫКУП' :'ОФОРМИТЬ ЗАКАЗ НА ВЫКУП'}</strong>
							)
					}	
					
					<strong className = { 'success' }>Заказ принят в работу
						<svg viewBox='0 0 12 10'>
							<polyline points='1.5 6 4.5 9 10.5 1'></polyline>
						</svg>
					</strong>
					<div className = { 'box' }></div>
					<div className = { 'truck' }>
						<div className = { 'car__name' }>FT</div>
						<div className = { 'back' }></div>
						<div className = { 'front' }>
							<div className = { 'window' }></div>
						</div>
						<div className = { 'light top' }></div>
						<div className = { 'light bottom' }></div>
					</div>
					<div className = { 'lines' }></div>
				</Button> 
			</div>
		</ToolTip>
    )
}

export default React.memo(OrderCar);

