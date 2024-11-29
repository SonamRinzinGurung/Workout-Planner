import { Plan } from "../components";
import { useAppContext } from "../context/appContext";

const ConfirmationPage = () => {
  const { formData, setFormData } = useAppContext();
  return (
    <div className="w-full md:w-3/4">
      <Plan {...formData} source="create" setFormData={setFormData} />
    </div>
  );
};

export default ConfirmationPage;
