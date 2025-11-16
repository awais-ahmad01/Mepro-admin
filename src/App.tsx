import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/notfound";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import LoyaltyProgram from "./pages/LoyaltyProgram";
import Promotions from "./pages/Promotions";
import Rewards from "./pages/Rewards";
import Invoice from "./pages/Invoice";
import Pricing from "./pages/Pricing";

// import SupportFeedback from "./pages/Feedback";
import Feedback from "./pages/Feedback";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";
import Payment from "./pages/Payment";
import TestPieChart from "./pages/test";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider, CssBaseline } from '@mui/material';
import lightTheme from './theme';
import { AuthProvider } from "./auth";
import MerchantManagement from "./pages/merchants";
import MerchantEditDemo from "./components/MerchantManagement/edit-merchant";
// import TiersManagement from "./pages/Tiers";
// import PointsPricingManagement from "./pages/PointsManagement";
import TransactionsManagement from "./pages/Transactions";
import ReportsAnalytics from "./pages/Reports";
import DiamondPromotions from "./pages/DiamondPromotions";

import SalesRepDashboard from "./pages/salesRepDashboard";

import TermsAndConditions from "./pages/termsAndConditions";

import Commissions from "./pages/commisions";

import CustomerManagement from "./pages/customerManagment";

import FinanceDashboard from "./pages/finance";

import DiamondManagement from "./pages/manageDiamonds";

import ScratchCardManagement from "./pages/scratchCard";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<TestPieChart />} />
          <Route path="*" element={<NotFound />} />

          {/* Dashboard routes (with sidebar/topbar, protected) */}
          <Route path="/" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/merchant" element={<ProtectedRoute><DashboardLayout><MerchantManagement /></DashboardLayout></ProtectedRoute>} />

         

               <Route path="/commission" element={<ProtectedRoute><DashboardLayout><Commissions /></DashboardLayout></ProtectedRoute>} />

                <Route path="/terms" element={<ProtectedRoute><DashboardLayout><TermsAndConditions /></DashboardLayout></ProtectedRoute>} />


                  <Route path="/customers" element={<ProtectedRoute><DashboardLayout><CustomerManagement /></DashboardLayout></ProtectedRoute>} />

                  <Route path="/finance" element={<ProtectedRoute><DashboardLayout><FinanceDashboard /></DashboardLayout></ProtectedRoute>} />

                  <Route path="/diamonds" element={<ProtectedRoute><DashboardLayout><DiamondManagement /></DashboardLayout></ProtectedRoute>} />

                    <Route path="/scratch-cards" element={<ProtectedRoute><DashboardLayout><ScratchCardManagement /></DashboardLayout></ProtectedRoute>} />

             <Route path="/sales-rep" element={<ProtectedRoute><DashboardLayout><SalesRepDashboard salesRepId="default-id" salesRepName="Sales Representative" /></DashboardLayout></ProtectedRoute>} />



          <Route path="/edit-merchant" element={<ProtectedRoute><DashboardLayout><MerchantEditDemo /></DashboardLayout></ProtectedRoute>} />
          {/* <Route path="/customers" element={<ProtectedRoute><DashboardLayout><Customers /></DashboardLayout></ProtectedRoute>} /> */}
          <Route path="/menu" element={<ProtectedRoute><DashboardLayout><Menu /></DashboardLayout></ProtectedRoute>} />
          <Route path="/order" element={<ProtectedRoute><DashboardLayout><Order /></DashboardLayout></ProtectedRoute>} />
          <Route path="/loyalty-program" element={<ProtectedRoute><DashboardLayout><LoyaltyProgram /></DashboardLayout></ProtectedRoute>} />
          <Route path="/promotions" element={<ProtectedRoute><DashboardLayout><Promotions /></DashboardLayout></ProtectedRoute>} />
          <Route path="/rewards" element={<ProtectedRoute><DashboardLayout><Rewards /></DashboardLayout></ProtectedRoute>} />
          <Route path="/invoice" element={<ProtectedRoute><DashboardLayout><Invoice /></DashboardLayout></ProtectedRoute>} />
          <Route path="/pricing" element={<ProtectedRoute><DashboardLayout><Pricing /></DashboardLayout></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><DashboardLayout><TransactionsManagement /></DashboardLayout></ProtectedRoute>} />
         
            <Route path="/diamondPromotions" element={<ProtectedRoute><DashboardLayout><DiamondPromotions /></DashboardLayout></ProtectedRoute>} />

          <Route path="/payment" element={<ProtectedRoute><DashboardLayout><Payment /></DashboardLayout></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><DashboardLayout><Feedback /></DashboardLayout></ProtectedRoute>} />
          {/* <Route path="/tiers" element={<ProtectedRoute><DashboardLayout><TiersManagement /></DashboardLayout></ProtectedRoute>} /> */}
          {/* <Route path="/points-management" element={<ProtectedRoute><DashboardLayout><PointsPricingManagement /></DashboardLayout></ProtectedRoute>} /> */}
          <Route path="/reports-analytics" element={<ProtectedRoute><DashboardLayout><ReportsAnalytics /></DashboardLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
          <Route path="/logout" element={<ProtectedRoute><DashboardLayout><Logout /></DashboardLayout></ProtectedRoute>} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}
