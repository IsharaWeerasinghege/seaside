import React from 'react';

const SupplierTable = ({supplier, deleteSupplier, dashboard}) => {
    return (<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead
                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-4 py-2">
                    Name
                </th>
                <th scope="col" className="px-4 py-2">
                    Address
                </th>
                <th scope="col" className="px-4 py-2">
                    Phone
                </th>
                <th scope="col" className="px-4 py-2">
                    Email
                </th>
                <th scope="col" className="px-4 py-2">
                    Category
                </th>
                <th scope="col" className="px-4 py-2">
                    Location
                </th>
                <th scope="col" className="px-4 py-2">
                    NIC
                </th>
                {
                    !dashboard && (
                        <th scope="col" className="px-4 py-2">
                            Actions
                        </th>
                    )
                }
            </tr>
            </thead>
            <tbody>
            {supplier?.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row"
                        className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item?.name}
                    </th>
                    <td className="px-4 py-2">
                        {item?.address}
                    </td>
                    <td className="px-4 py-2">
                        {item?.phone}
                    </td>
                    <td className="px-4 py-2">
                        {item?.email}
                    </td>
                    <td className="px-4 py-2">
                        {item?.category}
                    </td>
                    <td className="px-4 py-2">
                        {item?.location}
                    </td>
                    <td className="px-4 py-2">
                        {item?.nic}
                    </td>
                    {!dashboard && (
                        <td className="px-4 py-2">
                            <button
                                onClick={() => deleteSupplier(item?._id)}
                                className="px-4 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red">

                                Delete
                            </button>
                        </td>
                    )}
                </tr>))}

            </tbody>
        </table>)
}

export default SupplierTable;