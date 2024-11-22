import { Plan } from "../components";
import { useAppContext } from "../context/appContext";

const ConfirmationPage = () => {
  const { formData, setFormData } = useAppContext();
  return (
    <div>
      <Plan {...formData} source="create" setFormData={setFormData} />
    </div>
  );
};

export default ConfirmationPage;
