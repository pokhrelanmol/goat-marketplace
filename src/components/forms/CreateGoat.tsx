import React, { useState } from "react";
import { useUser } from "../../contexts/userContext";
import GoatDataServices from "../../services/goats-services";
interface IForm {
    type: string;
    weight: number;

    price: number;
    location: string;
}
const CreateGoat = () => {
    const [formData, setFormData] = useState<IForm>({} as IForm);
    const { user } = useUser();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleCreateGoat = async () => {
        if (
            !formData.location ||
            !formData.price ||
            !formData.type ||
            !formData.weight
        ) {
            alert("all fields are required");
            return;
        }
        try {
            const newGoat = await GoatDataServices.addGoat({
                ...formData,
                userId: user.id,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input
                name="type"
                type="text"
                onChange={onChange}
                placeholder="type, e.g boka,khasi etc"
            />
            <input
                onChange={onChange}
                name="weight"
                type="text"
                placeholder="weight"
            />
            <input
                onChange={onChange}
                name="price"
                type="text"
                placeholder="price"
            />
            <input
                onChange={onChange}
                name="image"
                type="text"
                placeholder="image"
            />
            <input
                onChange={onChange}
                name="location"
                type="text"
                placeholder="location"
            />
            <button onClick={() => handleCreateGoat()}>CREATE</button>
        </div>
    );
};

export default CreateGoat;
