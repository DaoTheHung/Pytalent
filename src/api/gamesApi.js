import apiClient from "./apiClient";

const gamesApi = {
  getGetGenerateQuestion: (id) => {
    const url = "/candidate/generate-question";
    return apiClient.post(url, id);
  },

  getAnswerQuestion: (data) => {
    const url = "/candidate/answer-question";
    return apiClient.post(url, data);
  },
  getFinishGame: (data) => {
    const url = `/candidate/finish-game`;

    return apiClient.post(url, data);
  },
};
export default gamesApi;
