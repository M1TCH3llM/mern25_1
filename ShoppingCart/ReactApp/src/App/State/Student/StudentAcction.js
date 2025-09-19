

export const FetchStudentsFromDBUsingFetch = () => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:9000/student/");
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();
      dispatch({ type: "STUDENT_LIST_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "STUDENT_LIST_ERROR", payload: err.message });
    }
  };
};

export const SaveStudentToDBUsingFetch = ({ studentName, studentCourses = [], courseProgress = 0 }) => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:9000/student/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentName, studentCourses, courseProgress })
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to save student");
      }

      const saved = await res.json();

      // optional: dispatch success for a reducer to handle
      dispatch({ type: "STUDENT_SAVE_SUCCESS", payload: saved });

      return saved;
    } catch (err) {
      // optional: dispatch error for a reducer to handle
      dispatch({ type: "STUDENT_SAVE_ERROR", payload: err.message });
      throw err;
    }
  };
};

export const DeleteStudentFromDBUsingFetch = (id) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:9000/student/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to delete student");
      }
      dispatch({ type: "STUDENT_DELETE_SUCCESS", payload: id });
    } catch (err) {
      dispatch({ type: "STUDENT_DELETE_ERROR", payload: err.message });
    }
  };
};
