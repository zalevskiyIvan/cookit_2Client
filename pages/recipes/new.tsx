import { useRouter } from "next/dist/client/router";
import AddRecipe from "../../Components/Recipes/AddRecipe/AddRecipe";
import MainLayout from "../../Layouts/MainLayout";
import style from "../../styles/AddRecipe.module.css";

const Header = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div className={style.header}>
      <div className={style.btns}>
        <img src="/img/exit.png" alt="exit" onClick={goBack} />
      </div>
    </div>
  );
};

export default function addRecipe() {
  return (
    <MainLayout Header={Header}>
      <AddRecipe />
    </MainLayout>
  );
}
