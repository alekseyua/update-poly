import React from 'react';
import { v4 } from 'uuid';
import Block from '../SpinnerWrapper';

import style from './styles/table.module.scss';

const Table = ({ classNameTable, tableHeaderData, tableBodyData = [], statusLoad = null}) => {

  return (
    <table className={style[classNameTable]}> 
      <thead> 
        {
          tableHeaderData.map((trElData, i) => {
            return (
              <tr key={v4()}>
                {trElData.map((th, thI) => {
                  return (
                    <th key={v4()} {...th?.attr}>
                      {th?.content}
                    </th>
                  );
                })}

              </tr>
            );
          })
        }
      </thead>
      <tbody>
        {
        statusLoad !== 'loading' ? (
          <tr>
            <td colSpan={5}>
              <Block.Spinner sizeWidth='20' sizeHeight='20'/>
            </td>
          </tr>
        ) : null
        }
        
        {
          !!tableBodyData.length?
            tableBodyData.map((trElData, i) => {
              return (
                <tr key={v4()}>
                  {
                  trElData.map((td, tdI) => {
                    
                    return (
                      <td key={v4()} {...td?.attr}>
                        {td?.content}
                      </td>   
                    );
                  })
                  }
          
                </tr>
              );
            })
            : null
        }
      </tbody>
    </table>
  );
};

export default React.memo(Table);
