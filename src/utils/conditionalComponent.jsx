import { WorkoutGroupForm, ConfirmationPage } from "../components";

const conditionalComponent = ({ page }) => {
  switch (page) {
    case 0:
      return <WorkoutGroupForm />
    case 1:
      return <ConfirmationPage />;
    default:
      return <WorkoutGroupForm />;
  }
};

export default conditionalComponent;
