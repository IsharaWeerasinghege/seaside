import React from 'react';

const DashboardItem = ({icon, title, count}) => {
  return (
      <div className={'w-1/4 bg-white rounded shadow-lg py-2 px-4 flex justify-between items-center'}>
          <div className={'text-2xl'}>
              {icon}
          </div>
          <div>
              <h1 className={'text-md font-semibold'}>{title}</h1>
              <h1 className={'text-2xl text-right font-bold'}>{count}</h1>
          </div>
      </div>
  )
}

export default DashboardItem;