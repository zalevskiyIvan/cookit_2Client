import { useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import style from "../../../styles/AddRecipe.module.css";
import { GET_ALL_POSTS } from "../PostsRendererQueries";
import { ADD_RECIPE } from "./AddRecipeMutation";

type stepType = {
  id: number;
  stepDescription: string;
  img?: string;
};

export default function AddRecipe() {
  const router = useRouter();

  const [ingredients, setIngredients] = useState([] as string[]);
  const [newIngredientInput, setNewIngredientInput] = useState(false);
  const [steps, setSteps] = useState([] as stepType[]);
  const [stepInput, setStepInput] = useState(true);

  const [newIngrTitle, setNewIngrTitle] = useState("");
  const [stepDescription, setStepDescription] = useState("");

  const { register, handleSubmit, reset } = useForm({ mode: "onBlur" });

  const addIngridient = () => {
    setIngredients([...ingredients, newIngrTitle]);
    setNewIngredientInput(false);
    setNewIngrTitle("");
  };

  const newStep = () => {
    setStepInput(true);
  };

  const confirmStep = () => {
    setSteps([...steps, { stepDescription, id: steps.length + 1 }]);
    setStepInput(false);
    setStepDescription("");
  };

  const [publishRecipe, { error, loading, data }] = useMutation(ADD_RECIPE, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  const addRecipe = async ({
    title,
    category,
    description,
    cookingTime,
    portionCount,
  }: {
    title: string;
    category: string;
    description: string;
    cookingTime: number;
    portionCount: number;
  }) => {
    const recipe = {
      title,
      category,
      description,
      steps,
      ingredients,
      cookingTime,
      portionCount,
    };
    try {
      await publishRecipe({ variables: { recipe } });

      !loading && router.push("/");
      
    } catch (error) {
      error.graphQLErrors.forEach(
        (e: any) =>
          e.extensions?.code === "UNAUTHENTICATED" && router.push("/auth")
      );
    }
  };
  return (
    <form className={style.main_form} onSubmit={handleSubmit(addRecipe)}>
      <div style={{ marginTop: "14%" }}>
        <div className={style.inputs}>
          <input
            {...register("title", { required: true })}
            placeholder="название"
            type="text"
          />
          <select {...register("category", { required: true })}>
            <option value="" selected disabled hidden>
              Категория
            </option>
            <option value="first">Первое</option>
            <option value="second">Второе</option>
            <option value="desert">Десерт</option>
            <option value="snack">Закуска</option>
            <option value="drink">Напиток</option>
            <option value="vegetarian">Вегетарианское</option>
          </select>
          <textarea
            {...register("description", { required: true })}
            placeholder="Описание"
          />
        </div>
        <div className={style.data}>
          <div className={style.violet_data}>Время приготовления:</div>
          <input
            className={style.white_data}
            {...register("cookingTime", { required: true })}
          />
        </div>
        <div className={style.data}>
          <div className={style.violet_data}>Количество порций:</div>
          <input
            className={style.white_data}
            {...register("portionCount", { required: true })}
          />
        </div>
        <div className={style.data}>
          <div className={style.violet_data}>Ингридиенты:</div>
          {ingredients.map((i) => {
            return <div className={style.white_data}>{i}</div>;
          })}
          {newIngredientInput && (
            <input
              onChange={(e) => setNewIngrTitle(e.target.value)}
              onBlur={addIngridient}
              className={style.white_data}
            />
          )}
          <img
            onClick={() => setNewIngredientInput(true)}
            className={style.newIngridient}
            src="/img/newIngridient.png"
            alt=""
          />
        </div>

        <div className={style.steps}>
          <div className={style.violet_data}>Шаги:</div>
          <br />
          {steps.map((step) => {
            return (
              <div className={style.data}>
                <div className={style.step_count}>{step.id}</div>
                <div className={style.step_input}>
                  <p className={style.stepDescription}>
                    {step.stepDescription}
                  </p>
                  <div>
                    <img src="/img/trash_bin.png" alt="" />
                  </div>
                </div>

                <img
                  className={style.step_image}
                  src="/img/image_sample.png"
                  alt=""
                />
              </div>
            );
          })}
          {stepInput && (
            <form className={style.data}>
              <button onClick={confirmStep} className={style.step_count}>
                <img src="/img/check_icon.png" alt="" />
              </button>
              <div className={style.step_input}>
                <div className={style.white_data}>
                  <textarea
                    onChange={(e) => setStepDescription(e.target.value)}
                    placeholder="Описание"
                  />
                </div>
                <img src="/img/trash_bin.png" alt="" />
              </div>

              <img
                className={style.step_image}
                src="/img/image_sample.png"
                alt=""
              />
            </form>
          )}
          <span className={style.add_step} onClick={newStep}>
            Добавить шаг
          </span>
        </div>
        <button type="submit" className={style.save}>
          Сохранить
        </button>
      </div>
    </form>
  );
}
