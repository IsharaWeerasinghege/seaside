import React from 'react';
import {Link} from "react-router-dom";

const YachtTable = ({yachts, deleteYacht, dashboard}) => {

    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead
                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Capacity
                </th>
                <th scope="col" className="px-6 py-3">
                    Type

                </th>
                <th scope="col" className="px-6 py-3">
                    Length
                </th>
                <th scope="col" className="px-6 py-3">
                    Rooms
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Warehouse
                </th>
                {!dashboard && (
                    <>
                        <th scope="col" className="px-6 py-3">
                            Edit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delete
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
                        {item?.capacity}
                    </td>
                    <td className="px-6 py-4">
                        {item?.type}
                    </td>
                    <td className="px-6 py-4">
                        {item?.length}
                    </td>
                    <td className="px-6 py-4">
                        {item?.rooms}
                    </td>
                    <td className="px-6 py-4">
                        ${item?.price}
                    </td>
                    <td className="px-6 py-4">
                        {item?.location}
                    </td>
                    {!dashboard && (
                        <>
                            <td className="px-6 py-4">
                                <Link to={`/admin/fleet/edit/${item._id}`}
                                      className="font-medium text-white bg-blue-500 py-1 px-2 rounded cursor-pointer hover:bg-blue-800 ">
                                    Edit
                                </Link>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    className="font-medium text-white bg-red-500 py-1 px-2 rounded cursor-pointer hover:bg-red-800 "
                                    onClick={() => deleteYacht(item._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </>
                    )}
                    {localStorage.getItem('role') === 'admin_invent' && (
                        <td className="px-6 py-4">
                            <Link to={`/admin/inventory/create/${item._id}`}
                                  className="font-medium text-white bg-blue-500 py-1 px-2 rounded cursor-pointer hover:bg-red-800 "
                            >
                                Create
                            </Link>
                        </td>
                    )}
                </tr>
            ))}

            </tbody>
        </table>
    )
}

export default YachtTable;