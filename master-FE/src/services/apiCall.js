import axios from "axios";

import {
  studentSignUp,
  signIn,
  getFacultyList,
  applyLeave,
  getLeaveStatus,
  getLeaveBalance,
  getProfile,
  changeProfilePic,
  updateStudentProfile
} from "../assets/apis";

const studentSignUpApi = async (formData) => {
  return await axios.post(studentSignUp, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const signInApi = async (values) => {
  return await axios.post(signIn, values);
};

const getFacultyListApi = async () => {
  return await axios.get(getFacultyList);
};

const applyLeaveApi = async (values) => {
  return await axios.post(applyLeave, values, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const getLeaveStatusApi = async () => {
  return await axios.get(getLeaveStatus, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const getLeaveBalanceApi = async () => {
  return await axios.get(getLeaveBalance, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const getProfileApi = async () => {
  return await axios.get(getProfile, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const changeProfileImageApi = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(changeProfilePic, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response;
};

const updateStudentProfileApi = async (values) => {
  return await axios.put(updateStudentProfile, values, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export {
  studentSignUpApi,
  signInApi,
  getFacultyListApi,
  applyLeaveApi,
  getLeaveStatusApi,
  getLeaveBalanceApi,
  getProfileApi,
  changeProfileImageApi,
  updateStudentProfileApi
};
