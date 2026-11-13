/**
 * CORE APPLICATION ARCHITECTURE MODULE BOUNDARY
 *
 * Provides shared application infrastructure:
 * - Session & Role-Based Access Control
 * - Multi-Tenant Workspace Storage & Repositories
 * - Area Navigation & Route Guards
 * - Official Product Taxonomy (Page -> Module -> Feature / Tool)
 */

export * from "./areas";
export * from "./session";
export * from "./permissions";
export * from "./storage";
export * from "./rawStorage";
export * from "./persistStorage";
export * from "./storageHelpers";
export * from "./routeAccess";
export * from "./taxonomy";
export * from "./repos";
