import { useCallback, useEffect, useState } from "react";
import { getRaw, setRaw } from "@/core/rawStorage";
import { useCurrentLauncherPage } from "./useCardPageMover";

export const PINNED_CARDS_STORAGE_KEY = "aio_pinned_cards_v1";
export const MAX_PINNED_CARDS = 5;

export type PinnedCardsMap = Record<string, string[]>;

function readStoredPinnedCards(): PinnedCardsMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = getRaw(PINNED_CARDS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed;
    }
  } catch {}
  return {};
}

function writeStoredPinnedCards(data: PinnedCardsMap): void {
  try {
    setRaw(PINNED_CARDS_STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function usePinnedCards(pageIdProp?: string | null) {
  const launcherPageId = useCurrentLauncherPage();
  const pageId =
    pageIdProp ||
    launcherPageId ||
    (typeof window !== "undefined" ? window.location.pathname : "global");

  const [pinnedMap, setPinnedMap] = useState<PinnedCardsMap>(() =>
    readStoredPinnedCards()
  );

  useEffect(() => {
    const handleUpdate = () => {
      setPinnedMap(readStoredPinnedCards());
    };
    window.addEventListener("aio_pinned_changed", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("aio_pinned_changed", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const pinnedList = pinnedMap[pageId] || [];

  const isPinned = useCallback(
    (cardId: string, specificPageId?: string | null): boolean => {
      const targetPage = specificPageId || pageId;
      const list = pinnedMap[targetPage] || [];
      return list.includes(cardId);
    },
    [pinnedMap, pageId]
  );

  const togglePin = useCallback(
    (cardId: string, specificPageId?: string | null): boolean => {
      const targetPage = specificPageId || pageId;
      const currentMap = readStoredPinnedCards();
      const currentList = currentMap[targetPage] || [];
      const isAlreadyPinned = currentList.includes(cardId);

      let nextList: string[];
      let message = "";

      if (isAlreadyPinned) {
        nextList = currentList.filter((id) => id !== cardId);
        message = "Pin kartu dilepas dari bagian atas.";
      } else {
        if (currentList.length >= MAX_PINNED_CARDS) {
          message = `Maksimal ${MAX_PINNED_CARDS} kartu yang dapat di-pin di bagian atas. Lepas pin salah satu kartu terlebih dahulu.`;
          setTimeout(() => {
            window.dispatchEvent(
              new CustomEvent("aio_toast", { detail: message })
            );
          }, 0);
          return false;
        }
        nextList = [...currentList, cardId];
        message = `Kartu berhasil di-pin di bagian atas (${nextList.length}/${MAX_PINNED_CARDS}).`;
      }

      const nextMap = {
        ...currentMap,
        [targetPage]: nextList,
      };

      writeStoredPinnedCards(nextMap);
      setPinnedMap(nextMap);

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("aio_pinned_changed"));
        window.dispatchEvent(new CustomEvent("aio_toast", { detail: message }));
      }, 0);

      return true;
    },
    [pageId]
  );

  return {
    pinnedList,
    isPinned,
    togglePin,
    maxPinned: MAX_PINNED_CARDS,
  };
}

/**
 * Mengurutkan kartu agar kartu yang di-pin berada di posisi pertama (maksimal 5).
 */
export function sortCardsWithPinned<T>(
  cards: T[],
  getId: (card: T) => string,
  pinnedIds: string[]
): T[] {
  if (!pinnedIds || pinnedIds.length === 0) return cards;
  const pinnedSet = new Set(pinnedIds);
  const pinnedCards: T[] = [];
  const unpinnedCards: T[] = [];

  for (const card of cards) {
    const id = getId(card);
    if (pinnedSet.has(id)) {
      pinnedCards.push(card);
    } else {
      unpinnedCards.push(card);
    }
  }

  // Urutkan kartu yang di-pin sesuai urutan di pinnedIds
  pinnedCards.sort((a, b) => {
    const idxA = pinnedIds.indexOf(getId(a));
    const idxB = pinnedIds.indexOf(getId(b));
    return idxA - idxB;
  });

  return [...pinnedCards, ...unpinnedCards];
}
