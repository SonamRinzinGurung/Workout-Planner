import PropTypes from "prop-types";
import { Plan } from "../components";

const ConfirmationPage = ({ formData, setFormData }) => {
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

ConfirmationPage.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};
export default ConfirmationPage;
