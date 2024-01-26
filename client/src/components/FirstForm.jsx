import PropTypes from "prop-types";
import { InputText } from "../components";

const FirstForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="flex flex-col items-center gap-1">
      <div>
        <p className="font-subHead font-semibold text-center">
          Name the Workout Plan
        </p>
      </div>
      <div>
        <InputText
          name="name"
          value={formData.name}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

FirstForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default FirstForm;
