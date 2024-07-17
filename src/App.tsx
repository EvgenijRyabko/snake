import { Controls } from "./components/Controls/Controls";
import { Field } from "./components/Field/Field";

export default function App() {
  return (
    <div className="w-full h-screen flex justify-items-center">
      <Field width={10} height={10} />
      <Controls />
    </div>
  );
}
