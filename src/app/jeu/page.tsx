import type { Metadata } from "next";
import { Game } from "@/components/Game";

export const metadata: Metadata = {
  title: "Jouer",
};

export default function GamePage() {
  return <Game />;
}
