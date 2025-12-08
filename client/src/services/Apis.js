import { commonrequest } from "./ApiCall";
import { BASE_URL } from "./helper";

// Register doctor function
export const registerDoctor = async (data, header) => {
  return await commonrequest(
    "POST",
    `${BASE_URL}/doctor/register`,
    data,
    header
  );
};

// Register major staff function
export const registerMajorStaff = async (data, header) => {
  return await commonrequest(
    "POST",
    `${BASE_URL}/majorstaff/register`,
    data,
    header
  );
};

// Register minor staff function
export const registerMinorStaff = async (data, header) => {
  return await commonrequest(
    "POST",
    `${BASE_URL}/minorstaff/register`,
    data,
    header
  );
};

// get all users
export const usergetfunc = async (
  search,
  gender,
  leave_type,
  sort,
  staff_type
) => {
  return await commonrequest(
    "GET",
    `${BASE_URL}/user/details?search=${search}&gender=${gender}&leave_type=${leave_type}&sort=${sort}&staff_type=${staff_type}`,
    ""
  );
};

// get a user
export const singleUsergetfunc = async (id) => {
  return await commonrequest("GET", `${BASE_URL}/user/${id}`, "");
};

// edit user
export const editfunc = async (id, data, header) => {
  return await commonrequest(
    "PUT",
    `${BASE_URL}/user/edit/${id}`,
    data,
    header
  );
};

// delete user
export const deletefunc = async (id) => {
  return await commonrequest("DELETE", `${BASE_URL}/user/delete/${id}`, {});
};

// export user
export const exporttocsvfunc = async () => {
  return await commonrequest("GET", `${BASE_URL}/userexport`, "");
};
