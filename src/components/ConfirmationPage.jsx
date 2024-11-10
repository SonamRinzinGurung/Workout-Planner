import { Plan } from "../components";
import { useAppContext } from "../context/appContext";

const ConfirmationPage = () => {
  const { formData, setFormData } = useAppContext();
  return (
    <div>
      <div>
        <p className="font-heading font-semibold text-xl text-center">
          Confirmation Page
        </p>
      </div>
      <Plan {...formData} source="create" setFormData={setFormData} />
    </div>
  );
};

export default ConfirmationPage;
