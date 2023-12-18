import { useLocation } from "react-router-dom";

export default function Page1() {
  console.log(useLocation());
  return <div>Page1</div>;
}
