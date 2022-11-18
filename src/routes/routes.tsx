import React, { lazy } from "react";

import { Routes as Switch, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import("../pages/home/Home"));
const ProjectDetails = lazy(() => import("../pages/projectDetail/ProjectDetails"));
const ProjectList = lazy(() => import("../pages/projectList/ProjectList"));
const SubmissionForm = lazy(() => import("../pages/submissionForm/SubmissionForm"));
const SubmitSuccess = lazy(() => import("../pages/submitSuccess/SubmitSuccess"));
const SubmittedProject = lazy(() => import("../pages/submittedProject/SubmittedProject"));
const UserProfile = lazy(() => import("../pages/userProfile/UserProfile"));

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
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
    </Switch>
  );
};

export default Routes;
