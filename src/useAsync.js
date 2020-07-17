import { useState, useEffect } from "react";

const useAsync = (asyncFn, dependencies) => {
  const [data, setData] = useState(null);
  const [state, setState] = useState("idle");

  useEffect(() => {
    setState("loading");
    asyncFn()
      .then(data => {
        setState("idle");
        setData(data);
      })
      .catch(err => {
        setState("error");
      });

    return () => {
      setData(null);
    };
    // eslint-disable-next-line
  }, dependencies);

  return [data, state];
};

export default useAsync;
