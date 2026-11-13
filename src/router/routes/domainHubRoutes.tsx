import React from "react";
import { createRoute, type AnyRoute } from "@tanstack/react-router";
import { AppShell } from "@/app/app-shell";
import { lazyNamed } from "../lazyRoute";
import { useFavorites } from "@/hooks/useFavorites";
import { BIZ_OPS_SUMMARY_DESC } from "@/features/business-operations/BusinessOperationsCustomersPage";
import { FIN_SUMMARY_DESC } from "@/features/launcher/FinancialWealthSection";
import { WORK_SUMMARY_DESC } from "@/features/work-productivity/WorkProductivityPage";
import { CREATIVE_SUMMARY_DESC } from "@/features/creative-workspace/CreativeWorkspaceMediaPage";
import { RESEARCH_SUMMARY_DESC } from "@/features/research-frameworks/ResearchFrameworksPage";
import { SHARIA_SUMMARY_DESC } from "@/features/syariah/IslamicPrinciplesShariaValuesPage";
import { PERSONAL_SUMMARY_DESC } from "@/features/personal-life/PersonalLifePage";
import { FAMILY_SUMMARY_DESC } from "@/features/family-records/FamilyRecordsHouseholdPage";
import { PUBLIC_AFFAIRS_SUMMARY_DESC } from "@/features/public-affairs/PublicRelationsPolicyAffairsPage";
import { SOCIAL_SUMMARY_DESC } from "@/features/social-networks/ContactDirectoryNetworksPage";

// Lazy loaded domain pages
const ValueTreatedPage = lazyNamed(() => import("@/features/value-treated/ValueTreatedPage"), "ValueTreatedPage", "Memuat Applied Value Framework...");
const WorkProductivityPage = lazyNamed(() => import("@/features/work-productivity/WorkProductivityPage"), "WorkProductivityPage", "Memuat Work Productivity...");
const PersonalLifePage = lazyNamed(() => import("@/features/personal-life/PersonalLifePage"), "PersonalLifePage", "Memuat Personal Life...");
const BusinessOperationsCustomersPage = lazyNamed(() => import("@/features/business-operations/BusinessOperationsCustomersPage"), "BusinessOperationsCustomersPage", "Memuat Business Operations...");
const KnowledgeAndLearningPage = lazyNamed(() => import("@/features/knowledge-learning/KnowledgeAndLearningPage"), "KnowledgeAndLearningPage", "Memuat Knowledge and Learning...");
const HomeLeisurePage = lazyNamed(() => import("@/features/home-leisure/HomeLeisurePage"), "HomeLeisurePage", "Memuat Home and Leisure...");
const FamilyCommunityPage = lazyNamed(() => import("@/features/family-community/FamilyCommunityPage"), "FamilyCommunityPage", "Memuat Family and Community...");
const IslamicPrinciplesShariaValuesPage = lazyNamed(() => import("@/features/syariah/IslamicPrinciplesShariaValuesPage"), "IslamicPrinciplesShariaValuesPage", "Memuat Prinsip Syariah...");
const CreativeWorkspaceMediaPage = lazyNamed(() => import("@/features/creative-workspace/CreativeWorkspaceMediaPage"), "CreativeWorkspaceMediaPage", "Memuat Creative Workspace...");
const ResearchFrameworksPage = lazyNamed(() => import("@/features/research-frameworks/ResearchFrameworksPage"), "ResearchFrameworksPage", "Memuat Research Frameworks...");
const FamilyRecordsHouseholdPage = lazyNamed(() => import("@/features/family-records/FamilyRecordsHouseholdPage"), "FamilyRecordsHouseholdPage", "Memuat Family Records...");
const PublicRelationsPolicyAffairsPage = lazyNamed(() => import("@/features/public-affairs/PublicRelationsPolicyAffairsPage"), "PublicRelationsPolicyAffairsPage", "Memuat Public Affairs...");
const ContactDirectoryNetworksPage = lazyNamed(() => import("@/features/social-networks/ContactDirectoryNetworksPage"), "ContactDirectoryNetworksPage", "Memuat Contact Directory...");
const FinancialWealthSection = lazyNamed(() => import("@/features/launcher/FinancialWealthSection"), "FinancialWealthSection", "Memuat Financial Planning...");

function WorkProductivityView() {
  return (
    <AppShell
      title="Productivity Workspace and Workflow Systems"
      subtitle={WORK_SUMMARY_DESC}
    >
      <WorkProductivityPage />
    </AppShell>
  );
}

function PersonalLifeView() {
  return (
    <AppShell
      title="Personal Life Management"
      subtitle={PERSONAL_SUMMARY_DESC}
    >
      <PersonalLifePage />
    </AppShell>
  );
}

function BusinessOperationsCustomersView() {
  return (
    <AppShell
      title="Business Administration and Operations Management"
      subtitle={BIZ_OPS_SUMMARY_DESC}
    >
      <BusinessOperationsCustomersPage />
    </AppShell>
  );
}

function KnowledgeAndLearningView() {
  return (
    <AppShell
      title="Knowledge and Learning"
      subtitle="Semua (7) · Documents (3) · Learning (2) · Creative (2)"
    >
      <KnowledgeAndLearningPage />
    </AppShell>
  );
}

function HomeLeisureView() {
  return (
    <AppShell
      title="Home and Leisure"
      subtitle="Semua (6) · Home (2) · Vehicle (2) · Leisure (2)"
    >
      <HomeLeisurePage />
    </AppShell>
  );
}

function FamilyCommunityView() {
  return (
    <AppShell
      title="Family and Community"
      subtitle="Semua (9) · Family (3) · Relationships (2) · Neighborhood (3) · Giving (1)"
    >
      <FamilyCommunityPage />
    </AppShell>
  );
}

function IslamicPrinciplesShariaValuesView() {
  return (
    <AppShell
      title="Islamic Principles and Sharia Values"
      subtitle={SHARIA_SUMMARY_DESC}
    >
      <IslamicPrinciplesShariaValuesPage />
    </AppShell>
  );
}

function CreativeWorkspaceMediaView() {
  return (
    <AppShell
      title="Creative Workspace and Media Production"
      subtitle={CREATIVE_SUMMARY_DESC}
    >
      <CreativeWorkspaceMediaPage />
    </AppShell>
  );
}

function ResearchFrameworksView() {
  return (
    <AppShell
      title="Research Foundations and Reference Frameworks"
      subtitle={RESEARCH_SUMMARY_DESC}
    >
      <ResearchFrameworksPage />
    </AppShell>
  );
}

function FamilyRecordsHouseholdView() {
  return (
    <AppShell
      title="Family Records and Household Planning"
      subtitle={FAMILY_SUMMARY_DESC}
    >
      <FamilyRecordsHouseholdPage />
    </AppShell>
  );
}

function PublicRelationsPolicyAffairsView() {
  return (
    <AppShell
      title="Public Affairs and Relations"
      subtitle={PUBLIC_AFFAIRS_SUMMARY_DESC}
    >
      <PublicRelationsPolicyAffairsPage />
    </AppShell>
  );
}

function ContactDirectoryNetworksView() {
  return (
    <AppShell
      title="Contact Directory and Social Networks"
      subtitle={SOCIAL_SUMMARY_DESC}
    >
      <ContactDirectoryNetworksPage />
    </AppShell>
  );
}

function FinancialPlanningWealthView() {
  const { favorites, toggleFavorite } = useFavorites();
  return (
    <AppShell
      title="Financial Planning and Wealth Management"
      subtitle={FIN_SUMMARY_DESC}
    >
      <div className="w-full max-w-[1815px] mx-auto px-2 sm:px-4 py-2">
        <FinancialWealthSection
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          getGradient={() => "from-emerald-500 to-teal-700"}
        />
      </div>
    </AppShell>
  );
}

export function createDomainHubRoutes(parentRoute: AnyRoute) {
  return [
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/value-treated",
      component: ValueTreatedPage,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/work-productivity",
      component: WorkProductivityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/work",
      component: WorkProductivityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/app-module",
      component: WorkProductivityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/productivity",
      component: WorkProductivityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/personal-life",
      component: PersonalLifeView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/personal-life-hub",
      component: PersonalLifeView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/personal",
      component: PersonalLifeView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/business-operations",
      component: BusinessOperationsCustomersView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/business-operations-and-customers",
      component: BusinessOperationsCustomersView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/business-ops",
      component: BusinessOperationsCustomersView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/knowledge-and-learning",
      component: KnowledgeAndLearningView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/knowledge-learning",
      component: KnowledgeAndLearningView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/home-and-leisure",
      component: HomeLeisureView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/home-leisure",
      component: HomeLeisureView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/family-and-community",
      component: FamilyCommunityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/family-community",
      component: FamilyCommunityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/sharia-values",
      component: IslamicPrinciplesShariaValuesView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/islamic-principles",
      component: IslamicPrinciplesShariaValuesView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/creative-workspace",
      component: CreativeWorkspaceMediaView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/research-frameworks",
      component: ResearchFrameworksView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/family-records",
      component: FamilyRecordsHouseholdView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/public-affairs",
      component: PublicRelationsPolicyAffairsView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/social-networks",
      component: ContactDirectoryNetworksView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/financial-planning",
      component: FinancialPlanningWealthView,
    }),
  ];
}
