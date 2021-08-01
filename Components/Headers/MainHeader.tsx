import { useRouter } from "next/dist/client/router";
import style from "../../styles/MainHeader.module.css";

export default function MainHeader() {
  const router = useRouter();
  const toAddRecipe = () => {
    router.push("/recipes/new");
  };
  return (
    <div className={style.header}>
      <img className={style.avatar} src="/img/avatar.png" alt="" />
      <form className={style.search_form}>
        <input type="text" placeholder="Поиск рецептов" />
        <img src="/img/search.png" alt="" />
      </form>

      <button className={style.button}>
        <img src="/img/plus.png" alt="" />
        <span onClick={toAddRecipe}>Создать рецепт</span>
      </button>
    </div>
  );
}
