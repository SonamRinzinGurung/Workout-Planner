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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div>
          <p>Name the Workout Plan</p>
        </div>
        <div>
          <InputText
            name="name"
            value={formData.name}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

FirstForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default FirstForm;
