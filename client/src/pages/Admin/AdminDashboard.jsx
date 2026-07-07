import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopNavbar from "../../components/admin/AdminTopNavbar";
import AdminHeader from "../../components/admin/AdminHeader";
import OverviewCards from "../../components/admin/OverviewCards";
import PlatformStatistics from "../../components/admin/PlatformStatistics";
import QuickActions from "../../components/admin/QuickActions";
import UserManagement from "../../components/admin/UserManagement";
import DoctorManagement from "../../components/admin/DoctorManagement";
import PatientManagement from "../../components/admin/PatientManagement";
import PredictionAnalytics from "../../components/admin/PredictionAnalytics";
import DiseaseAnalytics from "../../components/admin/DiseaseAnalytics";
import SystemHealth from "../../components/admin/SystemHealth";
import AuditLogs from "../../components/admin/AuditLogs";
import ActivityLogs from "../../components/admin/ActivityLogs";
import RoleManagement from "../../components/admin/RoleManagement";
import PermissionsManager from "../../components/admin/PermissionsManager";
import ReportManagement from "../../components/admin/ReportManagement";
import NotificationCenter from "../../components/admin/NotificationCenter";
import SystemSettings from "../../components/admin/SystemSettings";
import BackupManager from "../../components/admin/BackupManager";
import AdminProfile from "../../components/admin/AdminProfile";
import {
  archiveReport,
  deactivateUser,
  deleteReport,
  deleteUser,
  downloadReport,
  exportPlatformData,
  fetchActivityLogs,
  fetchAdminProfile,
  fetchAuditLogs,
  fetchBackups,
  fetchDoctors,
  fetchNotifications,
  fetchOverviewStats,
  fetchPatients,
  fetchPermissions,
  fetchPlatformStats,
  fetchPredictionAnalytics,
  fetchReports,
  fetchRoles,
  fetchSystemHealth,
  fetchSystemSettings,
  fetchUsers,
  markNotificationRead,
  runBackup,
  updateSystemSettings,
  updateUser,
} from "../../services/adminService";

const sectionTitles = {
  overview: { title: "Admin Dashboard", subtitle: "Platform overview and key metrics" },
  users: { title: "User Management", subtitle: "Search, filter, edit, and manage all users" },
  doctors: { title: "Doctor Management", subtitle: "Verification, specialization, and performance" },
  patients: { title: "Patient Management", subtitle: "Patient health status and records" },
  analytics: { title: "Prediction Analytics", subtitle: "AI prediction trends and disease distribution" },
  reports: { title: "Report Management", subtitle: "Search, download, archive, and delete reports" },
  system: { title: "System Health", subtitle: "API, database, and resource monitoring" },
  audit: { title: "Audit Logs", subtitle: "Login history, role changes, and system events" },
  roles: { title: "Role Management", subtitle: "Roles and permissions configuration" },
  notifications: { title: "Notification Center", subtitle: "System alerts and platform notifications" },
  settings: { title: "System Settings", subtitle: "Platform configuration and security" },
  backup: { title: "Backup Manager", subtitle: "Database backup and data export" },
  profile: { title: "Admin Profile", subtitle: "Your administrator account" },
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [health, setHealth] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [reports, setReports] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState(null);
  const [backups, setBackups] = useState([]);

  const loadData = useCallback(async () => {
    const [
      adminData,
      statsData,
      platformData,
      usersData,
      doctorsData,
      patientsData,
      analyticsData,
      healthData,
      auditData,
      activityData,
      rolesData,
      permsData,
      reportsData,
      notifsData,
      settingsData,
      backupsData,
    ] = await Promise.all([
      fetchAdminProfile(),
      fetchOverviewStats(),
      fetchPlatformStats(),
      fetchUsers(),
      fetchDoctors(),
      fetchPatients(),
      fetchPredictionAnalytics(),
      fetchSystemHealth(),
      fetchAuditLogs(),
      fetchActivityLogs(),
      fetchRoles(),
      fetchPermissions(),
      fetchReports(),
      fetchNotifications(),
      fetchSystemSettings(),
      fetchBackups(),
    ]);

    setAdmin(adminData);
    setStats(statsData);
    setPlatform(platformData);
    setUsers(usersData);
    setDoctors(doctorsData);
    setPatients(patientsData);
    setAnalytics(analyticsData);
    setHealth(healthData);
    setAuditLogs(auditData);
    setActivityLogs(activityData);
    setRoles(rolesData);
    setPermissions(permsData);
    setReports(reportsData);
    setNotifications(notifsData);
    setSettings(settingsData);
    setBackups(backupsData);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleQuickAction = (id) => {
    if (id === "users") setActiveSection("users");
    if (id === "reports") setActiveSection("reports");
    if (id === "backup") setActiveSection("backup");
    if (id === "export") exportPlatformData();
  };

  const refreshUsers = async () => setUsers(await fetchUsers());
  const refreshReports = async () => setReports(await fetchReports());

  const renderContent = () => {
    if (loading) {
      return <div className="py-20 text-center text-slate-400">Loading admin portal...</div>;
    }

    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <OverviewCards stats={stats} />
            <PlatformStatistics platform={platform} />
            <QuickActions onAction={handleQuickAction} />
            <NotificationCenter
              notifications={notifications.slice(0, 4)}
              onMarkRead={async (id) => setNotifications(await markNotificationRead(id))}
            />
          </div>
        );
      case "users":
        return (
          <UserManagement
            users={users}
            onUpdate={async (id, data) => {
              await updateUser(id, data);
              await refreshUsers();
            }}
            onDeactivate={async (id) => {
              await deactivateUser(id);
              await refreshUsers();
            }}
            onDelete={async (id) => {
              await deleteUser(id);
              await refreshUsers();
            }}
          />
        );
      case "doctors":
        return <DoctorManagement doctors={doctors} />;
      case "patients":
        return <PatientManagement patients={patients} />;
      case "analytics":
        return (
          <div className="space-y-6">
            <PredictionAnalytics analytics={analytics} />
            <DiseaseAnalytics data={analytics.diseaseDistribution} />
          </div>
        );
      case "reports":
        return (
          <ReportManagement
            reports={reports}
            onDownload={downloadReport}
            onDelete={async (id) => {
              await deleteReport(id);
              await refreshReports();
            }}
            onArchive={async (id) => {
              await archiveReport(id);
              await refreshReports();
            }}
          />
        );
      case "system":
        return <SystemHealth health={health} />;
      case "audit":
        return (
          <div className="grid gap-6 lg:grid-cols-2">
            <AuditLogs logs={auditLogs} />
            <ActivityLogs logs={activityLogs} />
          </div>
        );
      case "roles":
        return (
          <div className="space-y-6">
            <RoleManagement roles={roles} />
            <PermissionsManager permissions={permissions} roles={roles} />
          </div>
        );
      case "notifications":
        return (
          <NotificationCenter
            notifications={notifications}
            onMarkRead={async (id) => setNotifications(await markNotificationRead(id))}
          />
        );
      case "settings":
        return (
          <SystemSettings
            settings={settings}
            onChange={async (key, value) => {
              const updated = await updateSystemSettings({ [key]: value });
              setSettings(updated);
            }}
          />
        );
      case "backup":
        return (
          <BackupManager
            backups={backups}
            onRunBackup={async () => {
              const bk = await runBackup();
              setBackups((prev) => [bk, ...prev]);
            }}
            onExport={exportPlatformData}
          />
        );
      case "profile":
        return <AdminProfile admin={admin} />;
      default:
        return null;
    }
  };

  const section = sectionTitles[activeSection];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900/20 to-violet-900/20">
      <div className="pointer-events-none fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <AdminSidebar
        active={activeSection}
        onNavigate={(id) => {
          setActiveSection(id);
          setMobileSidebar(false);
        }}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
        mobileOpen={mobileSidebar}
      />

      {mobileSidebar && (
        <button type="button" className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileSidebar(false)} aria-label="Close sidebar" />
      )}

      <div className={`relative transition-all duration-300 ${sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64"}`}>
        {admin && (
          <AdminTopNavbar
            admin={admin}
            unreadCount={unreadCount}
            onMenuToggle={() => setMobileSidebar(true)}
            onNotifications={() => setActiveSection("notifications")}
          />
        )}

        <main className="p-4 lg:p-6">
          <AdminHeader title={section.title} subtitle={section.subtitle} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
