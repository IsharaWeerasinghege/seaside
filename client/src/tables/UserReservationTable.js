import React from 'react';

const ReservationTable = ({tableData}) => {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead
                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 text-center">
                    Yacht
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Branch
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Status
                </th>
            </tr>
            </thead>
            <tbody>
            {tableData?.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td
                        className="px-6 py-4 text-center">
                        {item?.yacht?.name}
                    </td>
                    <td className="px-6 py-4 capitalize text-center">
                        {item?.date.slice(0, 10)}
                    </td>
                    <td className="px-6 py-4 capitalize text-center">
                        {item?.yacht?.location}
                    </td>
                    <td className={'px-6 py-4 text-center'}>
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
                </tr>
            ))}

            </tbody>
        </table>
    )
}

export default ReservationTable;