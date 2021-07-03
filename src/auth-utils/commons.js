export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};
export const updateToken = (token) => {
  sessionStorage.setItem("token", token);
};
export const clearToken = (token) => {
  sessionStorage.clear();
};

export const verifyToken = (err) => {
  if (!err) {
    sessionStorage.clear();
    // setToken(null);

    window.location.href = "/login";
    return;
  }
  if (err.data === "Unauthorized") {
    sessionStorage.clear();
    window.location.href = "/login";
    // setToken(null);
  } else {
    return;
  }
};
export const setAccess = (access) => {
  sessionStorage.setItem("access", access);
};
export const isAccess = () => {
  var isAccess = sessionStorage.getItem("access") || false;
  return isAccess == "true";
};

export const setHospitalId = (hospitalId) => {
  sessionStorage.setItem("hospitalId", hospitalId);
};
export const getHospitalId = () => {
  return sessionStorage.getItem("hospitalId") || "abc";
};

export const getFormatedDateTime = (last_updated) => {
  var date = new Date(last_updated);

  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const getHospitalName = (hospital_id, hospitals) => {
  var names = hospitals.filter((item) => {
    if (item._id == hospital_id) {
      return item;
    }
  });
  if (names.length > 0) {
    return names[0].hospital_name;
  } else return null;
};
export const getHospital = (hospital_id, hospitals) => {
  var names = hospitals.filter((item) => {
    if (item._id == hospital_id) {
      return item;
    }
  });
  if (names.length > 0) {
    return names[0];
  } else return null;
};
