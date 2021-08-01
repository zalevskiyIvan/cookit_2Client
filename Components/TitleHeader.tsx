import style from "../styles/TitleHeader.module.css";

export default function TitleHeader() {
  return (
    <div className={style.header}>
      <img src="/img/appTitle.png" alt="" />
    </div>
  );
}
