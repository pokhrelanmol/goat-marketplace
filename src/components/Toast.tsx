import { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { useToast } from "../contexts/ToastContext";

const Toast = () => {
    const { toast, setToast } = useToast();
    const bgColor =
        toast.type === "success"
            ? "bg-green-500"
            : toast.type === "error"
            ? "bg-red-500"
            : toast.type === "warning"
            ? "bg-yellow-500"
            : "bg-blue-500";

    useEffect(() => {
        console.log(toast);
        setTimeout(() => {
            setToast({ msg: "", show: false });
        }, 3000);
    }, [toast.show, toast.msg]);
    console.log("toast component");
    if (toast.show) {
        return (
            <div
                className={`z-10 min-w-max  flex items-center gap-10 justify-between fixed py-3 px-5 rounded-lg shadow-lg left-1/2 -translate-x-1/2 bottom-12 ${bgColor}`}
            >
                {toast.msg}
                <MdCancel
                    className="cursor-pointer"
                    onClick={() => setToast({ show: false, msg: "" })}
                />
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default Toast;
