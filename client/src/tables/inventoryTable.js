import React from 'react';
import {Link} from "react-router-dom";

const YachtTable = ({yachts, dashboard, single}) => {

    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead
                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Warehouse
                </th>
                {
                    single && (
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                    )
                }
                <th scope="col" className="px-6 py-3">
                    Food
                </th>
                <th scope="col" className="px-6 py-3">
                    Beverage
                </th>
                <th scope="col" className="px-6 py-3">
                    Water
                </th>
                {!dashboard && !single && (
                    <>
                        <th scope="col" className="px-6 py-3">
                            Update
                        </th>
                    </>
                )}
            </tr>
            </thead>
            <tbody>
            {yachts?.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item?.name}
                    </th>
                    <td className="px-6 py-4">
                        {item?.location}
                    </td>
                    {single && (
                        <td className={'px-6 py-4'}>
                            {item?.date}
                        </td>
                    )}
                    <td className="px-6 py-4">
                        {item?.inventory?.reduce((a, b) => a + b.food, 0)}
                    </td>
                    <td className="px-6 py-4">
                        {item?.inventory?.reduce((a, b) => a + b.beverage, 0)}
                    </td>
                    <td className="px-6 py-4">
                        {item?.inventory?.reduce((a, b) => a + b.water, 0)}
                    </td>
                    {!dashboard && !single && (
                        <>
                            <td className="px-6 py-4">
                                <Link to={`/admin/inventory/${item.id}`}
                                      className="font-medium text-white bg-blue-500 py-1 px-2 rounded cursor-pointer hover:bg-blue-800 ">
                                    Update
                                </Link>
                            </td>
                        </>
                    )}
                </tr>
            ))}

            </tbody>
        </table>
    )
}

export default YachtTable;