import React from "react";

import { Routes as Switch, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import ProjectDetails from "../pages/projectDetail/ProjectDetails";
import ProjectList from "../pages/projectList/ProjectList";
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
    </Switch>
  );
};

export default Routes;
