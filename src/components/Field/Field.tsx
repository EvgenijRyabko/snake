import { useEffect, useRef, useState } from "react";
import "./Cell.css";

export const Field = ({ width, height }: { width: number; height: number }) => {
  const [pointer, setPointer] = useState("00");
  const tableRef: React.RefObject<HTMLTableElement> = useRef(null);
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

  const isPointer = (x: number, y: number) => {
    if (pointer === `${x}${y}`) {
      return "head cell";
    }
    return "cell";
  };

  useEffect(() => {
    let innerHtml = "";

    for (let i = 0; i < height; i++) {
      innerHtml += "<tr>";
      for (let j = 0; j < width; j++) {
        const className = isPointer(i, j);

        innerHtml += `<td id="${i}${j}" class="${className}"></td>`;
      }
      innerHtml += "</tr>";
    }

    if (tableRef.current) {
      tableRef.current.innerHTML = innerHtml;

      inputRef.current?.focus();
    }
  }, [width, height, pointer]);

  const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const [x, y] = pointer.split("");

    switch (event.key) {
      case "ArrowDown":
        setPointer(`${Number(x) + 1}${y}`);

        break;
      case "ArrowUp":
        setPointer(`${Number(x) + 1}${y}`);

        break;
      case "ArrowLeft":
        setPointer(`${Number(x) + 1}${y}`);

        break;
      case "ArrowRight":
        setPointer(`${Number(x) + 1}${y}`);

        break;
      default:
        break;
    }
  };

  return (
    <>
      <input
        onKeyDown={keyDown}
        type="text"
        onBlur={(e) => e.target.focus()}
        autoFocus={true}
        ref={inputRef}
      />
      <table
        ref={tableRef}
        className="w-full h-full flex items-center justify-center"
      />
    </>
  );
};
