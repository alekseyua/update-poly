import React from 'react';
import './ordercar.scss';
import { useStoreon } from 'storeon/react';
import Button from '../Button';
import ToolTip from '../ToolTip';

const OrderCar = ({enabled, styleCar, setStyleCar, selectedAdress, variant, payment_methods, statusFildValue}) => {
	
	const { orderFunc, dispatch } = useStoreon('orderFunc');
		const lifehack = () =>{
			window?.localStorage?.removeItem('numOrder')
			setStyleCar('orderCar animate');
			dispatch('orderFunc/state', true);
		}

console.log('styleCar', styleCar)
    return(
		<ToolTip
			content={!payment_methods? `У Вас не выбран метод оплаты` : !variant? `У Вас не выбран способ доставки` : !selectedAdress? `У Вас не выбран адрес доставки` : null}
			placement={'top'}
			trigger={!(styleCar === 'orderCar')?'hover': ''}
		>
			<div className = {'oder-main'}>
				<Button
					className={styleCar}
					onClick={lifehack}
				>	
					{
						!!statusFildValue? 
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


{/* <div className = {'oder-main'}>
				<Button
					className={styleCar}
					onClick={lifehack}
				>	
					{
						!!statusFildValue? 
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
			</div> */}