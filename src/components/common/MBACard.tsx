import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  RotateCcw,
  Pin,
  LayoutGrid,
  Zap,
  TrendingUp,
  Settings,
  Workflow,
  Copy,
  Database,
  BookOpen,
  Puzzle,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useKembaliButtonClass } from "@/hooks/useKembaliButtonClass";
import { usePinnedCards } from "@/hooks/usePinnedCards";
import { CardMoreMenu } from "./CardMoreMenu";
import { useCardIconColor, resolveIconBg } from "@/hooks/useCardIconColor";
import {
  makeMovedCardKey,
  useCardPageMover,
  useCurrentLauncherPage,
  type MovedCardRecord,
} from "@/hooks/useCardPageMover";

export type ModuleComponentCategory =
  | "Features"
  | "Tools"
  | "Dashboards"
  | "Workflows"
  | "Automations"
  | "Templates"
  | "Analytics"
  | "Records"
  | "Settings"
  | "Guides";

export const MODULE_COMPONENT_CATEGORIES: readonly ModuleComponentCategory[] = [
  "Features",
  "Tools",
  "Dashboards",
  "Workflows",
  "Automations",
  "Templates",
  "Analytics",
  "Records",
  "Settings",
  "Guides",
];

export const MODULE_COMPONENT_CATEGORY_ICONS: Record<ModuleComponentCategory, LucideIcon> = {
  Dashboards: LayoutGrid,
  Automations: Zap,
  Analytics: TrendingUp,
  Settings: Settings,
  Workflows: Workflow,
  Templates: Copy,
  Records: Database,
  Guides: BookOpen,
  Features: Puzzle,
  Tools: Wrench,
};

export function getComponentCategoryIcon(name?: string): LucideIcon | undefined {
  if (!name) return undefined;
  const exact = MODULE_COMPONENT_CATEGORY_ICONS[name as ModuleComponentCategory];
  if (exact) return exact;
  const normalized = name.trim().toLowerCase();
  const match = MODULE_COMPONENT_CATEGORIES.find(
    (cat) => cat.toLowerCase() === normalized
  );
  return match ? MODULE_COMPONENT_CATEGORY_ICONS[match] : undefined;
}

export interface CategorizableModuleItem {
  title?: string;
  label?: string;
  to?: string;
  desc?: string;
  componentCategory?: ModuleComponentCategory;
}

export function buildModuleCategoryGroups(
  items: CategorizableModuleItem[] | undefined,
  fallbackTo: string
): MBACardCategoryGroup[] | undefined {
  if (!items || items.length === 0) return undefined;
  const buckets = new Map<ModuleComponentCategory, MBACardFeatureItem[]>();
  for (const cat of MODULE_COMPONENT_CATEGORIES) {
    buckets.set(cat, []);
  }
  for (const item of items) {
    const cat = item.componentCategory || "Features";
    const title = item.title || item.label || "";
    buckets.get(cat)!.push({
      title,
      to: item.to || fallbackTo,
      desc: item.desc,
    });
  }
  const groups: MBACardCategoryGroup[] = [];
  let idx = 1;
  for (const cat of MODULE_COMPONENT_CATEGORIES) {
    const groupItems = buckets.get(cat)!;
    if (groupItems.length > 0) {
      groups.push({
        id: idx,
        categoryNumber: idx,
        name: cat,
        items: groupItems,
      });
      idx += 1;
    }
  }
  return groups.length > 0 ? groups : undefined;
}

export interface MBACardFeatureItem {
  title: string;
  to: string;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  desc?: string;
}

export interface MBACardCategoryGroup {
  id: number;
  categoryNumber: number;
  name: string;
  items: MBACardFeatureItem[];
}

export interface MBACardProps {
  id?: string;
  title: string;
  to: string;
  icon: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
  badge?: string;
  featureLabel?: string;
  shortDesc?: string;
  features?: MBACardFeatureItem[];
  tools?: MBACardFeatureItem[];
  categoryGroups?: MBACardCategoryGroup[];
  categoryOnlyMode?: boolean;
  isFav: boolean;
  toggleFavorite: (to: string) => void;
  gradient?: string;
  accentGradient?: string;
  maxFeatureCols?: 2 | 3 | 4 | 5;
  cardHeightClass?: string;
  showFeatureIcons?: boolean;
  movedRecord?: MovedCardRecord;
}

const GRADIENT_PALETTES = [
  "bg-linear-to-br from-blue-500 to-indigo-700",
  "bg-linear-to-br from-indigo-500 to-purple-700",
  "bg-linear-to-br from-purple-500 to-pink-700",
  "bg-linear-to-br from-rose-500 to-red-700",
  "bg-linear-to-br from-amber-500 to-orange-700",
  "bg-linear-to-br from-emerald-500 to-teal-700",
  "bg-linear-to-br from-cyan-500 to-blue-700",
  "bg-linear-to-br from-violet-500 to-fuchsia-700",
  "bg-linear-to-br from-fuchsia-500 to-rose-700",
  "bg-linear-to-br from-sky-500 to-blue-700",
  "bg-linear-to-br from-teal-500 to-emerald-700",
];

function getHashGradient(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % GRADIENT_PALETTES.length;
  return GRADIENT_PALETTES[idx];
}

export function MBACard({
  title,
  to,
  icon: Icon,
  badge,
  featureLabel,
  shortDesc,
  features = [],
  tools,
  categoryGroups,
  categoryOnlyMode = true,
  isFav,
  toggleFavorite,
  gradient,
  accentGradient,
  maxFeatureCols = 3,
  cardHeightClass = "min-h-[300px]",
  showFeatureIcons = true,
  movedRecord,
}: MBACardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const kembaliBtnClass = useKembaliButtonClass();
  const currentPageId = useCurrentLauncherPage();
  const { isCardMovedOut } = useCardPageMover();
  const { isPinned, togglePin } = usePinnedCards(currentPageId);
  const isCardPinned = isPinned(to || title, currentPageId);

  const [interactionConfig, setInteractionConfig] = useState(() => ({
    axis: Math.random() > 0.5 ? "x" : "y",
    dir: Math.random() > 0.5 ? 1 : -1,
  }));
  const { customColor } = useCardIconColor(title, to);

  // Hide native card if user moved it to a different Launcher page
  if (!movedRecord && currentPageId && isCardMovedOut(currentPageId, to, title)) {
    return null;
  }

  const handleFlip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setInteractionConfig((prev) => {
      let nextAxis = prev.axis;
      let nextDir = prev.dir;
      while (nextAxis === prev.axis && nextDir === prev.dir) {
        nextAxis = Math.random() > 0.5 ? "x" : "y";
        nextDir = Math.random() > 0.5 ? 1 : -1;
      }
      return { axis: nextAxis, dir: nextDir };
    });
    setIsFlipped((prev) => !prev);
  };

  const cardGradient =
    gradient ||
    (accentGradient
      ? accentGradient.startsWith("bg-")
        ? accentGradient
        : `bg-gradient-to-br ${accentGradient}`
      : getHashGradient(title));

  const iconBg = resolveIconBg(customColor, cardGradient);

  const mainPath = to.split("?")[0];
  const mainSearch = to.includes("?")
    ? Object.fromEntries(new URLSearchParams(to.split("?")[1]))
    : undefined;

  const moveData = currentPageId
    ? {
        cardKey:
          movedRecord?.cardKey ||
          makeMovedCardKey(currentPageId, to, title),
        originPageId: movedRecord?.originPageId || currentPageId,
        currentPageId,
        to,
        badge,
        shortDesc,
        gradient,
        accentGradient,
        icon: Icon,
        features: features.map((f) => ({
          title: f.title,
          to: f.to,
          desc: f.desc,
        })),
        tools: tools?.map((t) => ({
          title: t.title,
          to: t.to,
          desc: t.desc,
        })),
        categoryGroups: categoryGroups?.map((g) => ({
          id: g.id,
          categoryNumber: g.categoryNumber,
          name: g.name,
          items: g.items.map((item) => ({
            title: item.title,
            to: item.to,
            desc: item.desc,
          })),
        })),
      }
    : undefined;

  const renderFeatureChips = (items: MBACardFeatureItem[]) => {
    const is2x2 = items.length === 4 || maxFeatureCols === 2;
    return (
      <div
        className={
          is2x2
            ? "flex flex-wrap justify-center content-start gap-2 w-full"
            : "flex flex-wrap justify-center content-start gap-1.5 w-full"
        }
      >
        {items.map((feat, idx) => {
          const featPath = feat.to.split("?")[0];
          const featSearch = feat.to.includes("?")
            ? Object.fromEntries(new URLSearchParams(feat.to.split("?")[1]))
            : undefined;

          return (
            <Link
              key={idx}
              to={featPath as any}
              search={featSearch as any}
              title={feat.desc || feat.title}
              className="w-auto max-w-full inline-flex items-center justify-center px-[6px] py-[6px] rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary text-[11px] font-medium text-foreground transition-all cursor-pointer border border-border/40 hover:border-primary/30 group/chip text-center"
            >
              <span className="module-chip-label whitespace-normal">
                {feat.title}
              </span>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`w-full [perspective:1000px] h-full ${cardHeightClass}`}>
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        animate={{
          rotateX: isFlipped && interactionConfig.axis === "x" ? 180 * interactionConfig.dir : 0,
          rotateY: isFlipped && interactionConfig.axis === "y" ? 180 * interactionConfig.dir : 0,
        }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 15 }}
      >
        {/* Front Face (Gaya Kotak Tools 100 MBA) */}
        <div className="w-full h-full rounded-[28px] border border-border bg-card p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group [backface-visibility:hidden]">
          <div className="flex flex-col flex-1">
            <div className="flex items-start justify-between gap-3 shrink-0">
              <Link
                to={mainPath as any}
                search={mainSearch as any}
                className="flex items-center gap-3.5 group/header min-w-0 flex-1 outline-none"
              >
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center text-white shadow-xs shrink-0 ${iconBg.className} group-hover/header:scale-105 transition-all`}
                  style={iconBg.style}
                >
                  <Icon className="h-6 w-6 opacity-90 drop-shadow-sm" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-base text-foreground group-hover/header:text-primary transition-colors truncate">
                    {title}
                  </h4>
                  {badge && (
                    <span className="text-[11px] text-muted-foreground truncate block mt-0.5">
                      {badge}
                    </span>
                  )}
                </div>
              </Link>

              <div className="flex items-center gap-1.5 shrink-0">
                {isCardPinned && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      togglePin(to || title, currentPageId);
                    }}
                    className="p-1.5 rounded-xl border border-primary/25 bg-primary/15 text-primary hover:bg-primary/20 hover:border-primary/40 transition-all cursor-pointer active:scale-95 shrink-0 flex items-center justify-center shadow-2xs"
                    title="Lepas pin dari bagian atas halaman"
                    aria-label="Lepas pin kartu"
                  >
                    <Pin size={14} className="fill-primary rotate-45" />
                  </button>
                )}
                <CardMoreMenu
                  title={title}
                  isFav={isFav}
                  onToggleFavorite={() => toggleFavorite(to)}
                  moveData={moveData}
                  to={to}
                  icon={Icon}
                  defaultGradient={cardGradient}
                />
              </div>
            </div>

            {categoryGroups && categoryGroups.length > 0 ? (
              <div className="mt-3 pt-1 flex flex-col flex-1 space-y-4">
                {categoryGroups.map((group) => {
                  const CategoryIcon = getComponentCategoryIcon(group.name);
                  return (
                    <div key={group.id} className="flex flex-col">
                      <span className="inline-flex items-center justify-center gap-1 text-[10px] font-normal tracking-wider text-muted-foreground mb-1.5 text-center shrink-0">
                        {CategoryIcon && <CategoryIcon size={11} className="shrink-0" />}
                        <span>{group.name} ({group.items.length}):</span>
                      </span>
                      {renderFeatureChips(group.items)}
                    </div>
                  );
                })}
              </div>
            ) : features.length > 0 && tools && tools.length > 0 ? (
              <div className="mt-3 pt-1 flex flex-col flex-1 space-y-8">
                <div className="flex flex-col">
                  <span className="inline-flex items-center justify-center gap-1 text-[10px] font-normal tracking-wider text-muted-foreground mb-2 text-center shrink-0">
                    <Puzzle size={11} className="shrink-0" />
                    <span>Features ({features.length}):</span>
                  </span>
                  {renderFeatureChips(features)}
                </div>

                <div className="flex flex-col">
                  <span className="inline-flex items-center justify-center gap-1 text-[10px] font-normal tracking-wider text-muted-foreground mb-2 text-center shrink-0">
                    <Wrench size={11} className="shrink-0" />
                    <span>Tools ({tools.length}):</span>
                  </span>
                  {renderFeatureChips(tools)}
                </div>
              </div>
            ) : tools && tools.length > 0 ? (
              <div className="mt-3 pt-1 flex flex-col flex-1">
                <span className="inline-flex items-center justify-center gap-1 text-[10px] font-normal tracking-wider text-muted-foreground mb-2 text-center shrink-0">
                  <Wrench size={11} className="shrink-0" />
                  <span>Tools ({tools.length}):</span>
                </span>
                {renderFeatureChips(tools)}
              </div>
            ) : (
              (() => {
                const LabelIcon = getComponentCategoryIcon(featureLabel || "Features") || Puzzle;
                return (
                  <div className="mt-3 pt-1 flex flex-col flex-1">
                    <span className="inline-flex items-center justify-center gap-1 text-[10px] font-normal tracking-wider text-muted-foreground mb-2 text-center shrink-0">
                      <LabelIcon size={11} className="shrink-0" />
                      <span>
                        {featureLabel ? `${featureLabel} (${features.length}):` : `Features (${features.length}):`}
                      </span>
                    </span>
                    {renderFeatureChips(features)}
                  </div>
                );
              })()
            )}
          </div>

          <div className="pt-2 flex items-center justify-end text-xs shrink-0">
            <button
              type="button"
              onClick={handleFlip}
              className="px-3 py-1 rounded-full border border-border/70 hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors shadow-2xs group/btn"
              title="Lihat Related"
            >
              <span className="text-[11px]">Related</span>
              <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Back Face (Warna icon app + tombol kembali di ujung bawah kanan persis Tools 100 MBA) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-[28px] ${iconBg.className} p-4 shadow-lg border border-white/20 flex flex-col justify-end items-end overflow-hidden [backface-visibility:hidden]`}
          style={{
            ...iconBg.style,
            transform:
              interactionConfig.axis === "x"
                ? `rotateX(${180 * interactionConfig.dir}deg)`
                : `rotateY(${180 * interactionConfig.dir}deg)`,
          }}
        >
          <button
            type="button"
            onClick={handleFlip}
            className={kembaliBtnClass}
            title="Kembali"
          >
            <RotateCcw size={12} className="shrink-0" />
            <span className="text-[11px] font-medium">Kembali</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
