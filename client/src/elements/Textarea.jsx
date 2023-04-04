import React from 'react';
import {ErrorMessage, useField} from "formik";

const Input = ({icon, placeholder, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className={'flex items-center w-full gap-3 bg-gray-100 shadow-md mb-6 py-2 px-2 rounded relative'}>
            <textarea
                name={field.name}
                placeholder={placeholder}
                {...field}
                {...props}
                className={'w-full bg-transparent outline-none'}
            />
            {meta.touched && meta.error && (
                <div className={'absolute bottom-[-20px] text-sm left-8 text-red-600'}>
                    <ErrorMessage name={field.name}  />
                </div>
            )}
        </div>
    )
}

export default Input;