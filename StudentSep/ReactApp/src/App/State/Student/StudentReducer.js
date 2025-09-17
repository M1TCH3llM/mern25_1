// src/App/State/Student/StudentReducer.js

const initialState = {
  student: { studentName: "", studentCourses: [], courseProgress: 0, _id: undefined },
  students: [],
  error: ""
};

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
   
    case "STUDENT_SAVE_SUCCESS": {
      const saved = action.payload;
      return {
        ...state,
        student: saved,
        students: [saved, ...state.students],
        error: ""
      };
    }

    case "STUDENT_DELETE_SUCCESS":
  return {
    ...state,
    students: state.students.filter(s => s._id !== action.payload),
    student: state.student && state.student._id === action.payload
      ? { studentName: "", studentCourses: [], courseProgress: 0, _id: undefined }
      : state.student,
    error: ""
  };

case "STUDENT_DELETE_ERROR":
  return { ...state, error: action.payload || "Failed to delete student" };


    case "STUDENT_SAVE_ERROR":
      return { ...state, error: action.payload || "Failed to save student" };

    // after successful GET /student
    case "STUDENT_LIST_SUCCESS":
      return { ...state, students: action.payload, error: "" };

    case "STUDENT_LIST_ERROR":
      return { ...state, error: action.payload || "Failed to fetch students" };

    // optional manual set/clear
    case "ADD_STUDENT_TO_STORE":
      return { ...state, student: action.payload, error: "" };

    case "STUDENT_CLEAR_ERROR":
      return { ...state, error: "" };

    default:
      return state;
  }
}
