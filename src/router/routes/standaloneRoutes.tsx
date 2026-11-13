import React from "react";
import { createRoute, Navigate, type AnyRoute } from "@tanstack/react-router";
import { AppShell } from "@/app/app-shell";
import { lazyNamed } from "../lazyRoute";

// Lazy-loaded standalone apps for route-level code splitting
const TaskManagerApp = lazyNamed(() => import("@/features/task-manager/TaskManagerApp"), "TaskManagerApp", "Memuat Task Manager...");
const ProjectManagerApp = lazyNamed(() => import("@/features/project-manager/ProjectManagerApp"), "ProjectManagerApp", "Memuat Project Manager...");
const CalendarApp = lazyNamed(() => import("@/features/calendar/CalendarApp"), "CalendarApp", "Memuat Calendar...");
const PlannerApp = lazyNamed(() => import("@/features/planner/PlannerApp"), "PlannerApp", "Memuat Planner...");
const ReminderManagerApp = lazyNamed(() => import("@/features/reminder-manager/ReminderManagerApp"), "ReminderManagerApp", "Memuat Reminder Manager...");
const HabitTrackerApp = lazyNamed(() => import("@/features/habit-tracker/HabitTrackerApp"), "HabitTrackerApp", "Memuat Habit Tracker...");
const FocusTimerApp = lazyNamed(() => import("@/features/focus-timer/FocusTimerApp"), "FocusTimerApp", "Memuat Focus Timer...");
const EisenhowerApp = lazyNamed(() => import("@/features/eisenhower/EisenhowerApp"), "EisenhowerApp", "Memuat Eisenhower Matrix...");
const KanbanApp = lazyNamed(() => import("@/features/kanban/KanbanApp"), "KanbanApp", "Memuat Kanban Board...");
const TimelineApp = lazyNamed(() => import("@/features/timeline/TimelineApp"), "TimelineApp", "Memuat Timeline Manager...");
const CountdownApp = lazyNamed(() => import("@/features/countdown/CountdownApp"), "CountdownApp", "Memuat Countdown...");
const NotesApp = lazyNamed(() => import("@/features/notes/NotesApp"), "NotesApp", "Memuat Notes...");
const DocumentsApp = lazyNamed(() => import("@/features/documents/DocumentsApp"), "DocumentsApp", "Memuat Documents...");
const DatabaseApp = lazyNamed(() => import("@/features/database/DatabaseApp"), "DatabaseApp", "Memuat Database...");
const WebClipperApp = lazyNamed(() => import("@/features/web-clipper/WebClipperApp"), "WebClipperApp", "Memuat Web Clipper...");
const ResearchManagerApp = lazyNamed(() => import("@/features/research-manager/ResearchManagerApp"), "ResearchManagerApp", "Memuat Research Manager...");
const KnowledgeBaseApp = lazyNamed(() => import("@/features/knowledge-base/KnowledgeBaseApp"), "KnowledgeBaseApp", "Memuat Knowledge Base...");
const WikiApp = lazyNamed(() => import("@/features/wiki/WikiApp"), "WikiApp", "Memuat Wiki Engine...");
const MeetingManagerApp = lazyNamed(() => import("@/features/meeting-manager/MeetingManagerApp"), "MeetingManagerApp", "Memuat Meeting Manager...");
const DeliverableManagerApp = lazyNamed(() => import("@/features/deliverable-manager/DeliverableManagerApp"), "DeliverableManagerApp", "Memuat Deliverable Manager...");
const WorkflowManagerApp = lazyNamed(() => import("@/features/workflow-manager/WorkflowManagerApp"), "WorkflowManagerApp", "Memuat Workflow Manager...");
const FormsApp = lazyNamed(() => import("@/features/forms/FormsApp"), "FormsApp", "Memuat Forms...");
const CollaborationApp = lazyNamed(() => import("@/features/collaboration/CollaborationApp"), "CollaborationApp", "Memuat Collaboration...");
const StatisticsApp = lazyNamed(() => import("@/features/statistics/StatisticsApp"), "StatisticsApp", "Memuat Statistics...");
const SearchManagerApp = lazyNamed(() => import("@/features/search-manager/SearchManagerApp"), "SearchManagerApp", "Memuat Search Manager...");
const BookmarkManagerApp = lazyNamed(() => import("@/features/bookmark-manager/BookmarkManagerApp"), "BookmarkManagerApp", "Memuat Bookmark Manager...");
const NotificationCenterApp = lazyNamed(() => import("@/features/notification-center/NotificationCenterApp"), "NotificationCenterApp", "Memuat Notification Center...");
const ApprovalManagerApp = lazyNamed(() => import("@/features/approval-manager/ApprovalManagerApp"), "ApprovalManagerApp", "Memuat Approval Manager...");
const AssetManagerApp = lazyNamed(() => import("@/features/asset-manager/AssetManagerApp"), "AssetManagerApp", "Memuat Asset Manager...");
const TemplateManagerApp = lazyNamed(() => import("@/features/template-manager/TemplateManagerApp"), "TemplateManagerApp", "Memuat Template Manager...");
const GoalManagerApp = lazyNamed(() => import("@/features/goal-manager/GoalManagerApp"), "GoalManagerApp", "Memuat Goal Manager...");
const MilestoneManagerApp = lazyNamed(() => import("@/features/milestone-manager/MilestoneManagerApp"), "MilestoneManagerApp", "Memuat Milestone Manager...");
const TimeTrackerApp = lazyNamed(() => import("@/features/time-tracker/TimeTrackerApp"), "TimeTrackerApp", "Memuat Time Tracker...");
const ResourceManagerApp = lazyNamed(() => import("@/features/resource-manager/ResourceManagerApp"), "ResourceManagerApp", "Memuat Resource Manager...");
const PeopleManagerApp = lazyNamed(() => import("@/features/people-manager/PeopleManagerApp"), "PeopleManagerApp", "Memuat People Manager...");
const KomunitasWargaApp = lazyNamed(() => import("@/features/komunitas/KomunitasWargaApp"), "KomunitasWargaApp", "Memuat Komunitas Warga...");
const InteractionManagerApp = lazyNamed(() => import("@/features/interaction-manager/InteractionManagerApp"), "InteractionManagerApp", "Memuat Interaction Manager...");
const ScheduleManagerApp = lazyNamed(() => import("@/features/schedule-manager/ScheduleManagerApp"), "ScheduleManagerApp", "Memuat Schedule Manager...");
const SubscriptionManagerApp = lazyNamed(() => import("@/features/subscription-manager/SubscriptionManagerApp"), "SubscriptionManagerApp", "Memuat Subscription Manager...");
const ExpenseTrackerApp = lazyNamed(() => import("@/features/expense-tracker/ExpenseTrackerApp"), "ExpenseTrackerApp", "Memuat Expense Tracker...");

export function createStandaloneRoutes(parentRoute: AnyRoute) {
  // Views
  const TaskManagerView = () => (
    <AppShell title="Task Manager" subtitle="Standalone App Ecosystem #01 • Single Source of Truth for Tasks">
      <TaskManagerApp />
    </AppShell>
  );

  const ProjectManagerView = () => (
    <AppShell title="Project Manager" subtitle="Standalone App Ecosystem #03 • Single Source of Truth for Projects">
      <ProjectManagerApp />
    </AppShell>
  );

  const CalendarView = () => (
    <AppShell title="Calendar" subtitle="Standalone App Ecosystem #02 • Single Source of Truth for Events & Schedule View Layer">
      <CalendarApp />
    </AppShell>
  );

  const PlannerView = () => (
    <AppShell title="Planner" subtitle="Standalone App Ecosystem #04 • Time Allocation Layer & Deterministic Auto-Planning">
      <PlannerApp />
    </AppShell>
  );

  const ReminderManagerView = () => (
    <AppShell title="Reminder Manager" subtitle="Standalone App Ecosystem #05 • Centralized Execution & Notification Engine">
      <ReminderManagerApp />
    </AppShell>
  );

  const HabitTrackerView = () => (
    <AppShell title="Habit Tracker" subtitle="Standalone App Ecosystem #06 • Single Source of Truth for Habits & Streaks">
      <HabitTrackerApp />
    </AppShell>
  );

  const FocusTimerView = () => (
    <AppShell title="Focus Timer" subtitle="Standalone App Ecosystem #07 • Real-Time Focus Session Execution & Interruption Log">
      <FocusTimerApp />
    </AppShell>
  );

  const EisenhowerView = () => (
    <AppShell title="Eisenhower Matrix" subtitle="Standalone App Ecosystem #08 • Decision-Oriented Classification Layer">
      <EisenhowerApp />
    </AppShell>
  );

  const KanbanView = () => (
    <AppShell title="Kanban Board" subtitle="Standalone App Ecosystem #09 • Workflow Visualization, WIP Limits & Swimlanes">
      <KanbanApp />
    </AppShell>
  );

  const TimelineView = () => (
    <AppShell title="Timeline Manager" subtitle="Standalone App Ecosystem #10 • Gantt Chart, Dependency Violations & Critical Path (CPM)">
      <TimelineApp />
    </AppShell>
  );

  const CountdownView = () => (
    <AppShell title="Countdown" subtitle="Standalone App Ecosystem #11 • Single Source of Truth for Countdown, Event & Milestone Targets">
      <CountdownApp />
    </AppShell>
  );

  const NotesView = () => (
    <AppShell title="Notes" subtitle="Standalone App Ecosystem #12 • Single Source of Truth for Notes, Block Content & Knowledge Network">
      <NotesApp />
    </AppShell>
  );

  const DocumentsView = () => (
    <AppShell title="Documents" subtitle="Standalone App Ecosystem #13 • Single Source of Truth for Formal Documents, Versioning & Approvals">
      <DocumentsApp />
    </AppShell>
  );

  const DatabaseView = () => (
    <AppShell title="Database" subtitle="Standalone App Ecosystem #14 • Custom Fields, Formulas, Multi-View Grid & Summary Aggregations">
      <DatabaseApp />
    </AppShell>
  );

  const WebClipperView = () => (
    <AppShell title="Web Clipper" subtitle="Standalone App Ecosystem #15 • Full Article Extraction, Highlighting & Workflow Promotion">
      <WebClipperApp />
    </AppShell>
  );

  const ResearchManagerView = () => (
    <AppShell title="Research Manager" subtitle="Standalone App Ecosystem #16 • Hypothesis Tracking, Multi-Source Evidence & Knowledge Promotion">
      <ResearchManagerApp />
    </AppShell>
  );

  const KnowledgeBaseView = () => (
    <AppShell title="Knowledge Base" subtitle="Standalone App Ecosystem #17 • Verified Articles, Structured Metadata, Review Workflow & Source Citations">
      <KnowledgeBaseApp />
    </AppShell>
  );

  const WikiView = () => (
    <AppShell title="Wiki Engine" subtitle="Standalone App Ecosystem #18 • Wikilinks, Knowledge Graph, Automatic Backlinks & Broken Link Detection">
      <WikiApp />
    </AppShell>
  );

  const MeetingManagerView = () => (
    <AppShell title="Meeting Manager" subtitle="Standalone App Ecosystem #19 • Structured Meeting Lifecycle, Real-Time Notes & Decision Log">
      <MeetingManagerApp />
    </AppShell>
  );

  const DeliverableManagerView = () => (
    <AppShell title="Deliverable Manager" subtitle="Standalone App Ecosystem #20 • Definition of Done, Multi-Stage Approvals & Version Submissions">
      <DeliverableManagerApp />
    </AppShell>
  );

  const WorkflowManagerView = () => (
    <AppShell title="Workflow Manager" subtitle="Standalone App Ecosystem #21 • Formal Process Engine, Stages, Transitions & SLA Audits">
      <WorkflowManagerApp />
    </AppShell>
  );

  const FormsView = () => (
    <AppShell title="Forms" subtitle="Standalone App Ecosystem #22 • Structured Data Collection, Conditional Logic & ActionMapping Pipeline">
      <FormsApp />
    </AppShell>
  );

  const CollaborationView = () => (
    <AppShell title="Collaboration" subtitle="Standalone App Ecosystem #23 • Workspace RBAC, Teams, Generic Comments, Sharing & Unified Feed">
      <CollaborationApp />
    </AppShell>
  );

  const StatisticsView = () => (
    <AppShell title="Statistics" subtitle="Standalone App Ecosystem #24 • Cross-App Metric Aggregator, Time Series, Trends & Threshold Alerts">
      <StatisticsApp />
    </AppShell>
  );

  const SearchManagerView = () => (
    <AppShell title="Search Manager" subtitle="Standalone App Ecosystem #25 • Universal Discovery & Indexing Layer across all 90 Apps">
      <SearchManagerApp />
    </AppShell>
  );

  const BookmarkManagerView = () => (
    <AppShell title="Bookmark Manager" subtitle="Standalone App Ecosystem #26 • Single Source of Truth for URLs, Collections, Tags & Broken Link Audits">
      <BookmarkManagerApp />
    </AppShell>
  );

  const NotificationCenterView = () => (
    <AppShell title="Notification Center" subtitle="Standalone App Ecosystem #27 • Unified Cross-App Inbound Alert Inbox, Quick Actions & Channel Preferences">
      <NotificationCenterApp />
    </AppShell>
  );

  const ApprovalManagerView = () => (
    <AppShell title="Approval Manager" subtitle="Standalone App Ecosystem #28 • Multi-Stage Sequential & Parallel Approval Engine, Delegation & SLA Escalations">
      <ApprovalManagerApp />
    </AppShell>
  );

  const AssetManagerView = () => (
    <AppShell title="Asset Manager" subtitle="Standalone App Ecosystem #29 • Centralized Storage Layer, File Versioning, Orphan Detection & Broken Link Guard">
      <AssetManagerApp />
    </AppShell>
  );

  const TemplateManagerView = () => (
    <AppShell title="Template Manager" subtitle="Repository Template Dokumen & Formulir Baku">
      <div className="w-full max-w-[1720px] mx-auto p-4 sm:p-6 space-y-6">
        <TemplateManagerApp />
      </div>
    </AppShell>
  );

  const GoalManagerView = () => (
    <AppShell title="Goal Manager" subtitle="Puncak Hierarki Motivasi & Agregasi Metrik">
      <div className="w-full max-w-[1720px] mx-auto p-4 sm:p-6 space-y-6">
        <GoalManagerApp />
      </div>
    </AppShell>
  );

  const MilestoneManagerView = () => (
    <AppShell title="Milestone Manager" subtitle="Checkpoint Strategis Lintas-Project & Readiness Status">
      <div className="w-full max-w-[1720px] mx-auto p-4 sm:p-6 space-y-6">
        <MilestoneManagerApp />
      </div>
    </AppShell>
  );

  const TimeTrackerView = () => (
    <AppShell title="Time Tracker" subtitle="Catatan Waktu Resmi/Legal-Grade • Timesheet & Billing">
      <div className="w-full max-w-[1720px] mx-auto p-4 sm:p-6 space-y-6">
        <TimeTrackerApp />
      </div>
    </AppShell>
  );

  const ResourceManagerView = () => (
    <AppShell title="Resource Manager" subtitle="Source of Truth Kapasitas & Alokasi Lintas-Proyek">
      <div className="w-full max-w-[1720px] mx-auto p-4 sm:p-6 space-y-6">
        <ResourceManagerApp />
      </div>
    </AppShell>
  );

  const PeopleManagerView = () => (
    <AppShell title="People Manager" subtitle="Identity Layer • Rujukan Identitas Tunggal Seluruh Ekosistem">
      <div className="w-full max-w-[1720px] mx-auto p-4 sm:p-6 space-y-6">
        <PeopleManagerApp />
      </div>
    </AppShell>
  );

  const KomunitasWargaView = () => (
    <AppShell title="Komunitas Warga" subtitle="Manajemen Rukun Warga RT/RW, Transparansi Iuran, Pengumuman, dan Layanan Publik">
      <div className="w-full">
        <KomunitasWargaApp />
      </div>
    </AppShell>
  );

  const InteractionManagerView = () => (
    <AppShell title="Interaction Manager" subtitle="Relationship Timeline • Histori Komunikasi & Follow-up Eksekutif">
      <div className="w-full max-w-[1720px] mx-auto p-4 sm:p-6 space-y-6">
        <InteractionManagerApp />
      </div>
    </AppShell>
  );

  const ScheduleManagerView = () => (
    <AppShell title="Schedule Manager" subtitle="Source of Truth WorkSchedule • Pola Jam Kerja, Shift & Ketersediaan">
      <div className="w-full max-w-[1720px] mx-auto p-4 sm:p-6 space-y-6">
        <ScheduleManagerApp />
      </div>
    </AppShell>
  );

  const SubscriptionManagerView = () => (
    <AppShell title="Subscription Manager" subtitle="Recurring Cost & Billing Lifecycle Manager">
      <div className="w-full max-w-[1720px] mx-auto p-4 sm:p-6 space-y-6">
        <SubscriptionManagerApp />
      </div>
    </AppShell>
  );

  const ExpenseTrackerView = () => (
    <AppShell title="Expense Tracker" subtitle="Pencatatan Biaya, Akun, Merchant & Kepatuhan Bukti Struk">
      <div className="w-full max-w-[1720px] mx-auto p-4 sm:p-6 space-y-6">
        <ExpenseTrackerApp />
      </div>
    </AppShell>
  );

  return [
    // Task Manager
    createRoute({ getParentRoute: () => parentRoute, path: "/task-manager", component: TaskManagerView }),

    // Project Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/proyek", component: ProjectManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/project-manager", component: ProjectManagerView }),

    // Calendar & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/kalender", component: CalendarView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/events", component: CalendarView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/calendar", component: CalendarView }),

    // Planner & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/planner", component: PlannerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/daily-planner", component: PlannerView }),

    // Reminder Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/reminder-manager", component: ReminderManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/reminders", component: ReminderManagerView }),

    // Habit Tracker & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/habits", component: () => <Navigate to="/habit-tracker" replace /> }),
    createRoute({ getParentRoute: () => parentRoute, path: "/habit-tracker", component: HabitTrackerView }),

    // Focus Timer & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/pomodoro", component: FocusTimerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/focus-timer", component: () => <Navigate to="/pomodoro" replace /> }),

    // Eisenhower Matrix
    createRoute({ getParentRoute: () => parentRoute, path: "/eisenhower", component: EisenhowerView }),

    // Kanban Board & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/kanban", component: KanbanView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/kanban-board", component: KanbanView }),

    // Timeline Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/timeline", component: TimelineView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/gantt", component: TimelineView }),

    // Countdown
    createRoute({ getParentRoute: () => parentRoute, path: "/countdown", component: CountdownView }),

    // Notes & Documents
    createRoute({ getParentRoute: () => parentRoute, path: "/notes", component: NotesView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/documents", component: DocumentsView }),

    // Database & Datasets
    createRoute({ getParentRoute: () => parentRoute, path: "/database", component: DatabaseView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/datasets", component: DatabaseView }),

    // Web Clipper & Clipper
    createRoute({ getParentRoute: () => parentRoute, path: "/web-clipper", component: WebClipperView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/clipper", component: WebClipperView }),

    // Research Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/research-manager", component: ResearchManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/research", component: ResearchManagerView }),

    // Knowledge Base & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/knowledge-base", component: KnowledgeBaseView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/knowledge", component: KnowledgeBaseView }),

    // Wiki & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/wiki", component: WikiView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/knowledge-wiki", component: WikiView }),

    // Meeting Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/meeting-manager", component: MeetingManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/meetings", component: MeetingManagerView }),

    // Deliverable Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/deliverable-manager", component: DeliverableManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/deliverables", component: DeliverableManagerView }),

    // Workflow Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/workflow-manager", component: WorkflowManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/workflows", component: WorkflowManagerView }),

    // Forms & Collaboration
    createRoute({ getParentRoute: () => parentRoute, path: "/forms", component: FormsView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/collaboration", component: CollaborationView }),

    // Statistics & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/statistics", component: StatisticsView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/stats", component: StatisticsView }),

    // Search Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/search-manager", component: SearchManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/search", component: SearchManagerView }),

    // Bookmark Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/bookmarks", component: BookmarkManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/bookmark-manager", component: BookmarkManagerView }),

    // Notification Center & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/notification-center", component: NotificationCenterView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/notifications", component: NotificationCenterView }),

    // Approval Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/approval-manager", component: ApprovalManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/approvals", component: ApprovalManagerView }),

    // Asset Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/asset-manager", component: AssetManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/assets", component: AssetManagerView }),

    // Template Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/template-manager", component: TemplateManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/templates", component: TemplateManagerView }),

    // Goal Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/goal-manager", component: GoalManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/goals", component: GoalManagerView }),

    // Milestone Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/milestone-manager", component: MilestoneManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/milestones", component: MilestoneManagerView }),

    // Time Tracker & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/time-tracker", component: TimeTrackerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/timesheet", component: TimeTrackerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/timesheets", component: TimeTrackerView }),

    // Resource Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/resource-manager", component: ResourceManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/resources", component: ResourceManagerView }),

    // People Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/people-manager", component: PeopleManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/people", component: PeopleManagerView }),

    // Komunitas Warga
    createRoute({ getParentRoute: () => parentRoute, path: "/komunitas-warga", component: KomunitasWargaView }),

    // Interaction Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/interaction-manager", component: InteractionManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/interactions", component: InteractionManagerView }),

    // Schedule Manager & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/schedule-manager", component: ScheduleManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/schedules", component: ScheduleManagerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/roster", component: ScheduleManagerView }),

    // Subscription Manager
    createRoute({ getParentRoute: () => parentRoute, path: "/subscription-manager", component: SubscriptionManagerView }),

    // Expense Tracker & Aliases
    createRoute({ getParentRoute: () => parentRoute, path: "/expense-tracker", component: ExpenseTrackerView }),
    createRoute({ getParentRoute: () => parentRoute, path: "/expenses", component: ExpenseTrackerView }),
  ];
}
