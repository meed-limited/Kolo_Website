import React from "react";

import { Routes as Switch, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import ProjectDetails from "../pages/projectDetail/ProjectDetails";
import ProjectList from "../pages/projectList/ProjectList";
import SubmissionForm from "../pages/submissionForm/SubmissionForm";
import SubmitSuccess from "../pages/submitSuccess/SubmitSuccess";
import SubmittedProject from "../pages/submittedProject/SubmittedProject";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  return (
    <Switch>
      <Route index path="/" element={<Home />} />
      <Route path="/project-list" element={<ProjectList />} />
      <Route
        path="/project-detail"
        element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/submission-form"
        element={
          <ProtectedRoute>
            <SubmissionForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/submit-success"
        element={
          <ProtectedRoute>
            <SubmitSuccess />
          </ProtectedRoute>
        }
      />
      <Route
        path="/submitted-project"
        element={
          <ProtectedRoute>
            <SubmittedProject />
          </ProtectedRoute>
        }
      />
    </Switch>
  );
};

export default Routes;
