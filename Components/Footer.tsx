import style from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <div className={style.footer}>
      <div>
        <img src="/img/footerMain.png" alt="" />
        <span>Главная</span>
      </div>
      <div>
        <img src="/img/footerBook.png" alt="" />
        <span>Книга</span>
      </div>
      <div className={style.footer_bot}>
        <img src="/img/footerBot.png" alt="" />
      </div>
      <div>
        <img src="/img/footerSubscriptions.png" alt="" />
        <span>Подписки</span>
      </div>
      <div>
        <img src="/img/footerCategories.png" alt="" />
        <span>Категории</span>
      </div>
    </div>
  );
}
