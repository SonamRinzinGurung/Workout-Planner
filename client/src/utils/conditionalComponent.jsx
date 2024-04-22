import { WorkoutGroupForm, ConfirmationPage } from "../components";

const conditionalComponent = ({ page, formData, setFormData }) => {
  switch (page) {
    case 0:
      return <WorkoutGroupForm workouts={formData.workouts} setFormData={setFormData} />
    case 1:
      return <ConfirmationPage formData={formData} setFormData={setFormData} />;
    default:
      return <WorkoutGroupForm workouts={formData.workouts} setFormData={setFormData} />;
  }
};

export default conditionalComponent;
