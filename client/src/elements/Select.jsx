import React from 'react';
import {ErrorMessage, useField} from "formik";

const Select = ({icon, placeholder, list, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className={'flex items-center w-full gap-3 bg-gray-100 mb-7 py-3 px-4 rounded relative shadow-md'}>
            {icon}
            <select
                name=" name={field.name}"
                className={'w-full bg-transparent outline-none'}
                placeholder={placeholder}
                {...field}
                {...props}
            >
                <option value="" disabled selected hidden>{placeholder}</option>
                {list.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>

            {meta.touched && meta.error && (
                <div className={'absolute bottom-[-20px] text-sm left-8 text-red-600'}>
                    <ErrorMessage name={field.name}/>
                </div>
            )}
        </div>
    )
}

export default Select;