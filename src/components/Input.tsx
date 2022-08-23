import React from "react";
import { GoatType } from "../pages/Home";

interface IInputProps<T> {
    register: T;
    errors: T;
    name: string;
    type: string;
    placeholder: string;
    label: string;
    value?: GoatType;
    defaultValue?: string | number;
    selectOptions?: Array<string | number>;
    onChange?: T;
}
const Input = ({
    register,
    errors,
    name,
    type,
    placeholder,
    selectOptions,
    label,
    onChange,
    value,
    defaultValue,
}: IInputProps<any>) => {
    return (
        <div className="">
            <label
                htmlFor=""
                className="mb-2 block text-lg font-semibold text-primaryDark"
            >
                {label}{" "}
            </label>
            {type === "select" ? (
                <select
                    className="dropdown"
                    onChange={onChange}
                    name={name}
                    {...(register(name), { required: true })}
                    defaultValue={selectOptions?.find(
                        (name) => name === defaultValue
                    )}
                >
                    <option value="" selected={true} disabled>
                        --select--
                    </option>
                    {selectOptions?.map((name, idx) => (
                        <option value={name}>{name}</option>
                    ))}
                </select>
            ) : (
                <input
                    {...register(name)}
                    value={value?.weight || register.value}
                    type={type}
                    className="inputField"
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                />
            )}
            <p className="text-red-600">
                {errors[name] && errors[name].message}{" "}
            </p>
        </div>
    );
};

export default Input;
