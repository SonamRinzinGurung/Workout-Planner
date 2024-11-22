import { useAppContext } from "../context/appContext";
import { InputText } from "."

const PlanNameForm = () => {
    const { formData, setFormData } = useAppContext();
    const handleNameChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            name: e.target.value,
        }));
    };
    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <div>
                <p className="font-subHead font-medium text-xl md:text-2xl">Name the Workout Plan</p>
            </div>
            <div className="w-full flex">
                <InputText
                    name="plan name"
                    value={formData.name}
                    handleChange={handleNameChange}
                    className="border border-gray-500 p-2 rounded-md font-mono dark:bg-gray-900 text-center md:text-lg md:w-1/2 w-3/4 mx-auto h-14"
                />
            </div>
        </div>)
}

export default PlanNameForm