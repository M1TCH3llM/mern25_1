// src/AppComponents/Student/StudentComponent.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  SaveStudentToDBUsingFetch,
  FetchStudentsFromDBUsingFetch,
  DeleteStudentFromDBUsingFetch
} from "../../State/Student/StudentAcction";

const StudentComponent = () => {
  const [studentName, setStudentName] = useState("");
  const [studentCoursesText, setStudentCoursesText] = useState("");
  const [courseProgress, setCourseProgress] = useState(0);

  const dispatch = useDispatch(); 

  const { students, error } = useSelector(s => s.studentState);

  useEffect(() => {
    dispatch(FetchStudentsFromDBUsingFetch());
  }, [dispatch]);

  const saveStudentClick = async (evt) => {
    evt.preventDefault();

    const studentCourses = studentCoursesText
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    try {
      await dispatch(
        SaveStudentToDBUsingFetch({
          studentName,
          studentCourses,
          courseProgress: Number(courseProgress) || 0
        })
      );
      // refresh list after save
      dispatch(FetchStudentsFromDBUsingFetch());

      setStudentName("");
      setStudentCoursesText("");
      setCourseProgress(0);
    } catch (e) {
    }
  };

  const handleDelete = async (id) => {
    await dispatch(DeleteStudentFromDBUsingFetch(id));
  };

  return (
    <>
      <h1>Student Create Page</h1>
      <div className="form col-md-12">
        <div className="form-control">
          <div className="col-md-3">
            <b>Student Name</b>
          </div>
          <div className="col-md-7">
            <input
              type="text"
              className="form-control textbox"
              value={studentName}
              placeholder="Student name"
              maxLength={50}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>
        </div>

        <div className="form-control">
          <div className="col-md-3">
            <b>Student Courses</b>
          </div>
          <div className="col-md-7">
            <input
              type="text"
              className="form-control textbox"
              value={studentCoursesText}
              placeholder="Comma separated, e.g. Math101, CS50"
              onChange={(e) => setStudentCoursesText(e.target.value)}
            />
          </div>
        </div>

        <div className="form-control">
          <div className="col-md-3">
            <b>Course Progress (0–100)</b>
          </div>
          <div className="col-md-7">
            <input
              type="number"
              className="form-control textbox"
              value={courseProgress}
              min={0}
              max={100}
              onChange={(e) => setCourseProgress(e.target.value)}
            />
          </div>
        </div>

        <div className="form-control">
          <div className="col-md-7 button">
            <input
              type="submit"
              className="button"
              onClick={saveStudentClick}
              value={"Save Student"}
            />
          </div>
        </div>

        <hr />

        <h2>Students</h2>
        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <table className="table" style={{ maxWidth: 900 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Courses</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(students || []).length === 0 ? (
              <tr>
                <td colSpan="4"><em>No students yet.</em></td>
              </tr>
            ) : (
              students.map(s => (
                <tr key={s._id}>
                  <td>{s.studentName}</td>
                  <td>{(s.studentCourses || []).join(", ")}</td>
                  <td>{s.courseProgress}%</td>
                  <td>
                    <button onClick={() => handleDelete(s._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentComponent;
