import apiClient from "./apiClient";

const testApi = {
  getImage: () => {
    const url = "/images/search";
    return apiClient.get(url);
  },
  getLogin: (data) => {
    const url = "/login";
    return apiClient.post(url, data);
  },
  getLogout: (data) => {
    const url = "/logout";
    return apiClient.post(url, data);
  },
  getForgot: (data) => {
    const url = "/forgot-password";
    return apiClient.post(url, data);
  },
  getResetPsw: (data) => {
    const url = "/reset-password";
    return apiClient.post(url, data);
  },
  getChangePsw: (data) => {
    const url = "/update-password";
    return apiClient.post(url, data);
  },

  getCandidateLogin: (data) => {
    const url = "/candidate-login?token=3TVvsKX7SzF";

    return apiClient.post(url, data);
  },
  getListGames: () => {
    const url = "/list-game";

    return apiClient.get(url);
  },
  getCandidateGames: () => {
    const url = "/candidate/list-game";

    return apiClient.get(url);
  },
  getCreateAssessmennt: (data) => {
    const url = "/create-assessment";

    return apiClient.post(url, data);
  },
  getEditAssessmennt: (data) => {
    const url = "/edit-assessment";

    return apiClient.post(url, data);
  },
  getPostArchive: (data) => {
    const url = "/archive-assessment";

    return apiClient.post(url, data);
  },
  getPostUnArchive: (data) => {
    const url = "/unarchive-assessment";

    return apiClient.post(url, data);
  },
  getCopyAssessment: (data) => {
    const url = "/copy-assessment";

    return apiClient.post(url, data);
  },
  getInviteCadidate: (data) => {
    const url = "/invite-candidate";

    return apiClient.post(url, data);
  },
  getAssessment: () => {
    const url = `/list-assessment?status=${1}`;

    return apiClient.get(url);
  },
  getDetailAssessment: (id) => {
    const strId = id.toString();
    const url = `/detail-assessment?assessment_id=${strId}`;

    return apiClient.get(url);
  },

  getArchiveAssessment: () => {
    const url = `/list-assessment?status=${0}`;

    return apiClient.get(url);
  },

  getDeleteAssessment: (data) => {
    const url = `/delete-assessment`;

    return apiClient.post(url, data);
  },
  getDeleteAssessment: (data) => {
    const url = `/delete-assessment`;

    return apiClient.post(url, data);
  },


};

export default testApi;
