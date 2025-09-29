export const isLoggedIn = (user) =>
  !!(user && user.userName && user.userName !== "User Temp Reducer!!");

export const isAdmin = (user) => (user?.userName || "").toLowerCase() === "admin";