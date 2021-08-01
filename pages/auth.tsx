import Auth from "../Components/Auth/Auth";
import TitleHeader from "../Components/TitleHeader";
import MainLayout from "../Layouts/MainLayout";

export default function auth() {
  return (
    <MainLayout Header={TitleHeader}>
      <Auth />
    </MainLayout>
  );
}
