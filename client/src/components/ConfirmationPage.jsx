import PropTypes from "prop-types";
import { Plan } from "../components";

const ConfirmationPage = ({ formData }) => {
  return (
    <div>
      <div>
        <p>Confirmation Page</p>
      </div>
      <Plan {...formData} />
    </div>
  );
};

ConfirmationPage.propTypes = {
  formData: PropTypes.object.isRequired,
};
export default ConfirmationPage;
