import { useEffect, useRef, useState } from "react";
import "./Cell.css";

export const Field = ({ width, height }: { width: number; height: number }) => {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [tail, setTail] = useState({ x: 0, y: 0 });
  const [fruit, setFruit] = useState({ x: null, y: null } as unknown as {
    x: number;
    y: number;
  });
  const [direction, setDirection] = useState("DOWN");
  const [body, setBody] = useState([] as { x: number; y: number }[]);
  const tableRef: React.RefObject<HTMLTableElement> = useRef(null);
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

  const resetField = () => {
    setPointer({ x: 0, y: 0 });

    setBody([]);

    createFruit();
  };

  const createFruit = () => {
    const min = 0;
    const max = Number(`${width - 1}${height - 1}`);

    const freeCells = [];

    for (let i = min; i <= max; i++) {
      const cellId = i.toString().length < 2 ? `0${i}` : i.toString();

      const cell = document.getElementById(cellId);

      if (!["head", "body"].some((el) => cell?.classList.contains(el))) {
        freeCells.push(cellId);
      }
    }

    const [x, y] = freeCells[Math.floor(Math.random() * freeCells.length)];

    setFruit({ x: Number(x), y: Number(y) });
  };

  const moveBody = (x: number, y: number) => {
    let tmp = { ...body[0] };

    body[0] = { x, y };

    for (let i = 1; i < body.length; i++) {
      const curr = { ...body[i] };

      body[i] = { ...tmp };

      tmp = { ...curr };
    }
  };

  useEffect(() => {
    const isPointer = (x: number, y: number) => {
      if (`${pointer.x}${pointer.y}` === `${x}${y}`) {
        return "head cell";
      } else if (`${fruit.x}${fruit.y}` === `${x}${y}`) {
        return "fruit cell";
      } else if (
        body.map((el) => `${el?.x}${el?.y}`).some((el) => el === `${x}${y}`)
      ) {
        return "body cell";
      }
      return "cell";
    };

    const checkPosition = (x: number, y: number) => {
      if (x < 0 || x >= height || y < 0 || y >= width) {
        alert("You lose");

        resetField();
      } else if (x === fruit.x && y === fruit.y) {
        setBody([...body, { ...tail }]);

        createFruit();
      } else if (body.some((el) => el.x === x && el.y === y)) {
        alert("You lose");

        resetField();
      }
    };

    checkPosition(pointer.x, pointer.y);

    if (!fruit.x && !fruit.y) {
      createFruit();
    }

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
  }, [width, height, pointer, fruit]);

  const moveSnake = () => {
    const { x, y } = pointer;

    if (!body.length) setTail({ ...pointer });
    else setTail({ ...body[body.length - 1] });

    switch (direction) {
      case "DOWN":
        setPointer({ ...pointer, x: x + 1 });

        break;
      case "UP":
        setPointer({ ...pointer, x: x - 1 });

        break;
      case "LEFT":
        setPointer({ ...pointer, y: y - 1 });

        break;
      case "RIGHT":
        setPointer({ ...pointer, y: y + 1 });

        break;
    }

    if (body.length) moveBody(x, y);
  };

  const timer = setInterval(moveSnake, 500);

  const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // const { x, y } = pointer;

    // if (!body.length) setTail({ ...pointer });
    // else setTail({ ...body[body.length - 1] });

    switch (event.key) {
      case "ArrowDown":
        // setPointer({ ...pointer, x: x + 1 });
        setDirection("DOWN");

        break;
      case "ArrowUp":
        // setPointer({ ...pointer, x: x - 1 });
        setDirection("UP");

        break;
      case "ArrowLeft":
        // setPointer({ ...pointer, y: y - 1 });
        setDirection("LEFT");

        break;
      case "ArrowRight":
        // setPointer({ ...pointer, y: y + 1 });
        setDirection("RIGHT");

        break;
      case "r":
      case "R":
        resetField();
        break;
      default:
        break;
    }

    // if (body.length) moveBody(x, y);
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
