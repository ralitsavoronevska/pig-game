import { describe, it, expect, vi } from "vitest";
import { usePigGame } from "@/stores/usePigGame";

describe("usePigGame", () => {
  it("starts with initial state", () => {
    const { scores, currentScores, activePlayer, playing, winner } =
      usePigGame();

    expect(scores.value).toEqual([0, 0]);
    expect(currentScores.value).toEqual([0, 0]);
    expect(activePlayer.value).toBe(0);
    expect(playing.value).toBe(true);
    expect(winner.value).toBeNull();
  });

  it("rolls dice and adds to currentScores", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5); // dice = 6

    const { rollDice, currentScores, activePlayer } = usePigGame();

    rollDice();

    expect(currentScores.value).toEqual([4, 0]);
    expect(activePlayer.value).toBe(0);
  });

  it("rolls 1 — loses currentScores, switches player", () => {
    vi.spyOn(Math, "random").mockReturnValue(0); // dice = 1

    const { rollDice, currentScores, activePlayer } = usePigGame();

    rollDice();

    expect(currentScores.value).toEqual([0, 0]);
    expect(activePlayer.value).toBe(1);
  });

  it("holdScores — adds to score, switches if no win", () => {
    const { currentScores, activePlayer, holdScore, scores } = usePigGame();

    currentScores.value[0] = 20;
    holdScore();

    expect(scores.value[0]).toBe(20);
    expect(currentScores.value[0]).toBe(0);
    expect(activePlayer.value).toBe(1);
  });

  it("holdScores and reaches 100 — wins game", () => {
    const game = usePigGame(100);
    game.scores.value[0] = 90;
    game.currentScores.value[0] = 15;

    game.holdScore();

    expect(game.scores.value[0]).toBe(105);
    expect(game.playing.value).toBe(false);
    expect(game.winner.value).toBe(0);
  });

  it("new game resets state", () => {
    const { newGame, scores, currentScores, activePlayer, playing } =
      usePigGame();

    scores.value[0] = 50;
    currentScores.value[0] = 10;
    activePlayer.value = 1;
    playing.value = false;

    newGame();

    expect(scores.value).toEqual([0, 0]);
    expect(currentScores.value).toEqual([0, 0]);
    expect(activePlayer.value).toBe(0);
    expect(playing.value).toBe(true);
  });
});
