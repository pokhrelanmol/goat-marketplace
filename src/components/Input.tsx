import React from "react";

interface IInputProps<T> {
    register: T;
    errors: T;
    name: string;
    type: string;
    placeholder: string;
    label: string;
    selectOptions?: Array<string | number>;
    onChange?: () => void;
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
                    className="dropdown  "
                    onChange={onChange}
                    name={name}
                    {...(register(name), { required: true })}
                >
                    <option value={undefined} selected={true} disabled>
                        --select--
                    </option>
                    {selectOptions?.map((name, idx) => (
                        <option key={idx} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    {...register(name)}
                    type={type}
                    className="inputField"
                    placeholder={placeholder}
                />
            )}
            <p className="text-red-600">
                {errors[name] && errors[name].message}{" "}
            </p>
        </div>
    );
};

export default Input;
