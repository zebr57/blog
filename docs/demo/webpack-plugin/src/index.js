import lodash from "lodash";
import "./style.css";
import { add } from "./utils";

function component() {
  const element = document.createElement("div");

  element.innerHTML = lodash.join(["Hello", "webpack"], " ");
  element.classList.add("title");

  console.log(add(1, 2));

  return element;
}

document.body.appendChild(component());
