import * as React from "react";
import * as ReactDom from "react-dom";
import Hello from "./Hello";

ReactDom.render(
    <Hello name="TypeScript" enthusiasmLevel={10} />,
    document.getElementById("app") as HTMLElement
);
