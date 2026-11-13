import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LevelGame } from "@/components/LevelGame";
import { getLevelRooms } from "@/data/game";
import { LEVELS, getLevel } from "@/data/meta";
import { toPublicRoom } from "@/server/game-logic";

interface Props {
  params: Promise<{ niveau: string }>;
}

export function generateStaticParams() {
  return LEVELS.map((level) => ({ niveau: level.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niveau } = await params;
  const level = getLevel(niveau);
  return { title: level ? `Niveau ${level.name}` : "Niveau introuvable" };
}

export default async function LevelPage({ params }: Props) {
  const { niveau } = await params;
  const level = getLevel(niveau);
  if (!level) notFound();

  // Seule la version « publique » des salles part vers le navigateur : jamais les réponses.
  const rooms = getLevelRooms(level.id).map(toPublicRoom);
  return <LevelGame levelId={level.id} rooms={rooms} />;
}
