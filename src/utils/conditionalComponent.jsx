import { WorkoutGroupForm, ConfirmationPage, PlanNameForm } from "../components";

const conditionalComponent = ({ page }) => {
  switch (page) {
    case 0:
      return <PlanNameForm />;
    case 1:
      return <WorkoutGroupForm />
    case 2:
      return <ConfirmationPage />;
    default:
      return <WorkoutGroupForm />;
  }
};

export default conditionalComponent;
