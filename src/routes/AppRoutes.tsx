import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import SenderCredential from "../pages/SenderCredential";
import ProtectedRoute from "../auth/ProtectedRoute";
import FileUpload from "../pages/FileUpload";
import ViewFiles from "../pages/ViewFiles";
import CampaignLiveStream from "../pages/CampaignLiveStream";
import CreateCohort from "../pages/CohortCreation";
import CohortCustomerLiveStream from "../pages/CohortCustomer";
import CreateEmailTemplate from "../pages/EmailTemplateCreation";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sendercredential"
        element={
          <ProtectedRoute>
            <SenderCredential />
          </ProtectedRoute>
        }
      />
      <Route
        path="/fileupload"
        element={
          <ProtectedRoute>
            <FileUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewfiles"
        element={
          <ProtectedRoute>
            <ViewFiles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/campaignlivestream"
        element={
          <ProtectedRoute>
            <CampaignLiveStream />
          </ProtectedRoute>
        }
      />
      <Route
        path="/createcohort"
        element={
          <ProtectedRoute>
            <CreateCohort />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addcohortcustomer"
        element={
          <ProtectedRoute>
            <CohortCustomerLiveStream />
          </ProtectedRoute>
        }
      />

      <Route
        path="/createtemplate"
        element={
          <ProtectedRoute>
            <CreateEmailTemplate />
          </ProtectedRoute>
        }
      />

    </Routes>
    
    
  );
}
