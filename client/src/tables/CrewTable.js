import React from 'react';
import {Link} from "react-router-dom";

const CrewTable = ({crew, dashboard, handleDelete}) => {


    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead
                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-4 py-2">
                    Name
                </th>
                <th scope="col" className="px-4 py-2">
                    Email
                </th>
                <th scope="col" className="px-4 py-2">
                    Phone
                </th>
                <th scope="col" className="px-4 py-2">
                    Address
                </th>
                <th scope="col" className="px-4 py-2">
                    Role
                </th>
                <th scope="col" className="px-4 py-2">
                    Branch
                </th>
                <th scope="col" className="px-4 py-2">
                    NIC
                </th>
                {!dashboard && (
                    <>
                    <th scope="col" className="px-4 py-2">
                        Edit
                    </th>
                    <th scope="col" className="px-4 py-2">
                        Delete
                    </th>
                    </>
                )}

            </tr>
            </thead>
            <tbody>
            {crew.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td className="px-4 py-2">
                        {item.name}
                    </td>
                    <td className="px-4 py-2">
                        {item.email}
                    </td>
                    <td className="px-4 py-2">
                        {item.phone}
                    </td>
                    <td className="px-4 py-2">
                        {item.address}
                    </td>
                    <td className="px-4 py-2">
                        {item.role}
                    </td>
                    <td className="px-4 py-2">
                        {item.branch}
                    </td>
                    <td className="px-4 py-2">
                        {item.nic}
                    </td>
                    {!dashboard && (
                        <>
                        <td className="px-4 py-2">
                            <Link
                                to={`edit/${item._id}`}
                                className="font-medium text-white bg-blue-500 py-1 px-2 rounded cursor-pointer hover:bg-blue-800 "
                            >
                                Edit
                            </Link>
                        </td>
                        <td className="px-4 py-2">
                            <button
                                className="font-medium text-white bg-red-500 py-1 px-2 rounded cursor-pointer hover:bg-red-800 "
                                onClick={() => handleDelete(item._id)}
                            >
                                Delete
                            </button>
                        </td>
                        </>
                    )}
                </tr>
            ))}

            </tbody>
        </table>
    )
}

export default CrewTable ;