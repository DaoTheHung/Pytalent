import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../recoil/commonRecoilState";

export const useLoading = (isLoading) => {
  const setLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
};
