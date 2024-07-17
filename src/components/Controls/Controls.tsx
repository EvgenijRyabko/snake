export const Controls = () => {
  return (
    <section className="flex flex-wrap border border-black mt-auto my-auto mx-4 p-2">
      <h1 className="text-center w-full">Управление</h1>
      <hr className="w-full black h-[10px]" />
      <p>
        ← - Движение налево <br />
        → - Движение направо <br />
        ↑ - Движение вверх <br />
        ↓ - Движение вниз <br />R - Начать заново
      </p>
      <hr className="w-full" />
    </section>
  );
};
