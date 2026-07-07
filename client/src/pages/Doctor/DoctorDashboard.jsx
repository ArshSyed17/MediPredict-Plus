import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DoctorSidebar from "../../components/doctor/DoctorSidebar";
import DoctorTopNavbar from "../../components/doctor/DoctorTopNavbar";
import DoctorHeader from "../../components/doctor/DoctorHeader";
import DoctorOverview from "../../components/doctor/DoctorOverview";
import PatientList from "../../components/doctor/PatientList";
import PatientDetails from "../../components/doctor/PatientDetails";
import PredictionReview from "../../components/doctor/PredictionReview";
import ReportViewer from "../../components/doctor/ReportViewer";
import ConsultationNotes from "../../components/doctor/ConsultationNotes";
import AppointmentList from "../../components/doctor/AppointmentList";
import AnalyticsOverview from "../../components/doctor/AnalyticsOverview";
import DoctorNotifications from "../../components/doctor/DoctorNotifications";
import DoctorProfile from "../../components/doctor/DoctorProfile";
import {
  addConsultationNote,
  exportDoctorData,
  fetchAnalytics,
  fetchAppointments,
  fetchDoctorProfile,
  fetchNotifications,
  fetchOverviewStats,
  fetchPatientById,
  fetchPatients,
  filterPatients,
  markNotificationRead,
  updateConsultationNote,
} from "../../services/doctorService";

const sectionTitles = {
  overview: { title: "Dashboard Overview", subtitle: "Clinical insights at a glance" },
  patients: { title: "Patient Management", subtitle: "Search, filter, and review patient records" },
  appointments: { title: "Appointments", subtitle: "Upcoming and past consultations" },
  analytics: { title: "Analytics", subtitle: "Population health and AI performance metrics" },
  notifications: { title: "Notifications", subtitle: "Alerts and system updates" },
  profile: { title: "Doctor Profile", subtitle: "Your professional information" },
};

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  const [doctor, setDoctor] = useState(null);
  const [stats, setStats] = useState(null);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientView, setPatientView] = useState("details");
  const [patientFilters, setPatientFilters] = useState({ search: "", risk: "all", sort: "name" });

  const loadData = useCallback(async () => {
    const [doc, overview, pts, apts, notifs, anal] = await Promise.all([
      fetchDoctorProfile(),
      fetchOverviewStats(),
      fetchPatients(),
      fetchAppointments(),
      fetchNotifications(),
      fetchAnalytics(),
    ]);
    setDoctor(doc);
    setStats(overview);
    setPatients(pts);
    setAppointments(apts);
    setNotifications(notifs);
    setAnalytics(anal);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredPatients = useMemo(
    () => filterPatients(patients, patientFilters),
    [patients, patientFilters]
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const selectPatient = async (patientOrId) => {
    const id = typeof patientOrId === "string" ? patientOrId : patientOrId.id;
    setSelectedPatientId(id);
    const patient = await fetchPatientById(id);
    setSelectedPatient(patient);
    setPatientView("details");
    setActiveSection("patients");
    setMobileSidebar(false);
  };

  const handleQuickAction = async (actionId) => {
    if (actionId === "patients") setActiveSection("patients");
    if (actionId === "reports") {
      setActiveSection("patients");
      if (patients[0]) await selectPatient(patients[0].id);
      setPatientView("report");
    }
    if (actionId === "notes") {
      setActiveSection("patients");
      if (patients[0]) await selectPatient(patients[0].id);
      setPatientView("notes");
    }
    if (actionId === "export") await exportDoctorData();
  };

  const handleMarkRead = async (id) => {
    const updated = await markNotificationRead(id);
    setNotifications(updated);
  };

  const handleAddNote = async (text) => {
    if (!selectedPatient) return;
    await addConsultationNote(selectedPatient.id, text);
    const refreshed = await fetchPatientById(selectedPatient.id);
    setSelectedPatient(refreshed);
  };

  const handleEditNote = async (noteId, text) => {
    if (!selectedPatient) return;
    await updateConsultationNote(selectedPatient.id, noteId, text);
    const refreshed = await fetchPatientById(selectedPatient.id);
    setSelectedPatient(refreshed);
  };

  const handleFilterChange = (key, value) => {
    setPatientFilters((prev) => ({ ...prev, [key]: value }));
  };

  const renderContent = () => {
    if (loading) {
      return <div className="py-20 text-center text-slate-400">Loading doctor portal...</div>;
    }

    switch (activeSection) {
      case "overview":
        return (
          <DoctorOverview
            stats={stats}
            analytics={analytics}
            notifications={notifications}
            onAction={handleQuickAction}
            onMarkRead={handleMarkRead}
          />
        );
      case "patients":
        return (
          <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
            <PatientList
              patients={filteredPatients}
              selectedId={selectedPatientId}
              filters={patientFilters}
              onFilterChange={handleFilterChange}
              onSelect={selectPatient}
            />
            <div>
              {!selectedPatient && (
                <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/20 text-slate-400">
                  Select a patient to view details
                </div>
              )}
              {selectedPatient && patientView === "details" && (
                <PatientDetails
                  patient={selectedPatient}
                  onViewPrediction={() => setPatientView("prediction")}
                  onViewReport={() => setPatientView("report")}
                  onViewNotes={() => setPatientView("notes")}
                />
              )}
              {selectedPatient && patientView === "prediction" && (
                <div className="space-y-4">
                  <button type="button" onClick={() => setPatientView("details")} className="text-sm text-cyan-300 hover:underline">
                    ← Back to patient
                  </button>
                  <PredictionReview prediction={selectedPatient.latestPrediction} />
                </div>
              )}
              {selectedPatient && patientView === "report" && (
                <div className="space-y-4">
                  <button type="button" onClick={() => setPatientView("details")} className="text-sm text-cyan-300 hover:underline">
                    ← Back to patient
                  </button>
                  <ReportViewer report={selectedPatient.latestReport} patientName={selectedPatient.name} />
                </div>
              )}
              {selectedPatient && patientView === "notes" && (
                <div className="space-y-4">
                  <button type="button" onClick={() => setPatientView("details")} className="text-sm text-cyan-300 hover:underline">
                    ← Back to patient
                  </button>
                  <ConsultationNotes notes={selectedPatient.notes} onAdd={handleAddNote} onEdit={handleEditNote} />
                </div>
              )}
            </div>
          </div>
        );
      case "appointments":
        return <AppointmentList appointments={appointments} onPatientSelect={selectPatient} />;
      case "analytics":
        return <AnalyticsOverview analytics={analytics} />;
      case "notifications":
        return <DoctorNotifications notifications={notifications} onMarkRead={handleMarkRead} />;
      case "profile":
        return <DoctorProfile doctor={doctor} />;
      default:
        return null;
    }
  };

  const section = sectionTitles[activeSection];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
      <div className="pointer-events-none fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <DoctorSidebar
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
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebar(false)}
          aria-label="Close sidebar"
        />
      )}

      <div
        className={`relative transition-all duration-300 ${
          sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64"
        }`}
      >
        {doctor && (
          <DoctorTopNavbar
            doctor={doctor}
            unreadCount={unreadCount}
            onMenuToggle={() => setMobileSidebar(true)}
            onNotifications={() => setActiveSection("notifications")}
          />
        )}

        <main className="p-4 lg:p-6">
          <DoctorHeader title={section.title} subtitle={section.subtitle} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection + (selectedPatientId ?? "") + patientView}
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

export default DoctorDashboard;
