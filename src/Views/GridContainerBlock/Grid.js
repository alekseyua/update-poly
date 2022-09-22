import classNames from 'classnames';
import style from './styles/grid.module.scss';

const Grid = ({ className, children }) => {
  return (
    <div
      className={classNames({
        [className]: !!className,
        [style['grid__container']]: true,
      })}
    >
      {children}
    </div>
  );
};

export default React.memo(Grid);
