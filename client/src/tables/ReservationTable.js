import React from 'react';

const ReservationTable = ({tableData, handleUpdate, dashboard}) => {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead
                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Yacht
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Branch
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                {!dashboard && (
                    <>
                        <th scope="col" className="px-6 py-3">
                            Confirm
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Reject
                        </th>
                    </>
                )}
            </tr>
            </thead>
            <tbody>
            {tableData?.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td className="px-6 py-4">
                        {item?.yacht?.name}
                    </td>
                    <td className="px-6 py-4 capitalize">
                        {item?.date.slice(0, 10)}
                    </td>
                    <td className="px-6 py-4 capitalize">
                        {item?.yacht?.location}
                    </td>
                    <td className="px-6 py-4">
                        {item?.user?.name}
                    </td>

                    <td className="px-6 py-4">
                        {item?.user?.phone}
                    </td>
                    <td className="px-6 py-4">
                        {item?.user?.email}
                    </td>

                    <td className={'px-6 py-4'}>
                        {item?.status === 'pending' ? (
                            <span
                                className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-sm ">
                                Pending
                            </span>
                        ) : item?.status === 'confirmed' ? (
                            <span
                                className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"
                            >
                                Confirmed
                            </span>
                        ) : (
                            <span
                                className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm "
                            >
                                Rejected
                            </span>
                        )
                        }
                    </td>

                    {!dashboard && (
                        <>
                            <td className="px-6 py-4">
                                <button
                                    className="font-medium text-white bg-blue-500 py-1 px-2 rounded cursor-pointer hover:bg-blue-800 "
                                    onClick={() => handleUpdate(item._id, 'confirmed')}
                                >
                                    Confirm
                                </button>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    className="font-medium text-white bg-red-500 py-1 px-2 rounded cursor-pointer hover:bg-red-800 "
                                    onClick={() => handleUpdate(item._id, 'rejected')}
                                >
                                    Reject
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

export default ReservationTable;