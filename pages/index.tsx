import MainLayout from "../Layouts/MainLayout";
import PostRenderer from "../Components/Recipes/PostRenderer";
import MainHeader from "../Components/Headers/MainHeader";
export default function Home() {
  return (
    <MainLayout Header={MainHeader}>
      <PostRenderer />
    </MainLayout>
  );
}
