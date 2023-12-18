import { useSearchParams } from "react-router-dom";
export default function Page4() {
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("a"));
  return (
    <div>
      Page4
      <button
        onClick={() => {
          setSearchParams({
            a: 123,
            b: 456,
          });
        }}
      >修改路由参数</button>
    </div>
  );
}
