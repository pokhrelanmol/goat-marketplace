import { GoatType } from "../pages/Home";
import uniqid from "uniqid";

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
    selectValue?: string | number;
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
    selectValue,
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
                    value={selectValue}
                    // {...(register(name), { required: true })}
                    defaultValue={defaultValue}
                >
                    <option value="" selected disabled>
                        --select--
                    </option>
                    {selectOptions?.map((name, idx) => (
                        <option key={uniqid()} value={name}>
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
