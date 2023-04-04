import React from 'react';

const FeedbackTable = ({tableData, dashboard, resolveFeedback}) => {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead
                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 text-center">
                    Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Email
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Message
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Status
                </th>
                {!dashboard && (
                    <>
                        <th scope="col" className="px-6 py-3 text-center">
                            Resolve
                        </th>
                        <th scope={'col'} className={'px-6 py-3 text-center'}>
                            Reject
                        </th>

                    </>
                )}
            </tr>
            </thead>
            <tbody>
            {tableData?.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td
                        className="px-6 py-4 text-center">
                        {item?.name}
                    </td>
                    <td className="px-6 py-4 capitalize text-center">
                        {item?.createdAt.slice(0, 10)}
                    </td>
                    <td className="px-6 py-4 capitalize text-center">
                        {item?.email}
                    </td>
                    <td className="px-6 py-4 capitalize text-center">
                        {item?.phone}
                    </td>
                    <td className="px-6 py-4 capitalize text-center">
                        {item?.message}
                    </td>
                    <td className={'px-6 py-4 text-center'}>
                        {item?.status === 'pending' ? (
                            <span
                                className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-sm ">
                                Pending
                            </span>
                        ) : item?.status === 'resolved' ? (
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
                            <td className="px-6 py-4 text-center">
                                <button
                                    className="px-2 py-1 font-semibold text-white bg-green-500 rounded-sm"
                                    onClick={() => resolveFeedback(item?._id, item?.email, 'resolved')}
                                >
                                    Resolve
                                </button>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <button
                                    className="px-2 py-1 font-semibold text-white bg-red-500 rounded-sm"
                                    onClick={() => resolveFeedback(item?._id, item?.email, 'rejected')}
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

export default FeedbackTable;