import { useScoreActions } from "../store";

const Buttons = () => {
  const { update } = useScoreActions();

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => update("good")}>good</button>
      <button onClick={() => update("neutral")}>neutral</button>
      <button onClick={() => update("bad")}>bad</button>
    </div>
  );
};

export default Buttons;
