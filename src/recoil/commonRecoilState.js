import { atom } from "recoil";
import { getCookie } from "../utils/cookies";

const get = () => {
  return getCookie("isLogin");
};
export const loadingState = atom({
  key: "loading",
  default: false,
});
export const isRefetchState = atom({
  key: "refetch",
  default: false,
});

export const auth = atom({
  key: "auth",
  default: "",
});

export const removeAs = atom({
  key: "removeAs",
  default: "",
});

export const ListAssessment = atom({
  key: "isAdd",
  default: [],
});

export const DetailAssessment = atom({
  key: "detail",
  default: [],
});

export const tokenCandidate = atom({
  key: "candidate",
  default: "",
});
export const isDisplayLogo = atom({
  key: "displayLogo",
  default: true,
});

export const idGames = atom({
  key: "idGames",
  default: "true",
});
export const scoreGame = atom({
  key: "scoreGame",
  default: 0,
});

export const countDate = atom({
  key: "countDate",
  default: 0,
});



export const isEndGame = atom({
  key: "isEndGame",
  default: false,
});
