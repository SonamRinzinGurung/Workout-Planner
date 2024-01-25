import { FirstForm, SecondForm, ConfirmationPage } from "../components";

const conditionalComponent = ({ page, formData, setFormData }) => {
  switch (page) {
    case 0:
      return <FirstForm formData={formData} setFormData={setFormData} />;
    case 1:
      return <SecondForm formData={formData} setFormData={setFormData} />;
    case 2:
      return <ConfirmationPage formData={formData} />;
    default:
      return <FirstForm formData={formData} setFormData={setFormData} />;
  }
};

export default conditionalComponent;
