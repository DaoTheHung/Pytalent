import { useRecoilValue } from "recoil";
import { loadingState } from "../../recoil/commonRecoilState";

export default function Loading() {
  const loading = useRecoilValue(loadingState);

  return (
    <>
      {loading && (
        <div className="loader">
          <div className="loader-inner">
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
