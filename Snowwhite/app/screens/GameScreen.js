import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const ROWS = 10;
const COLS = 10;
const CELL_SIZE = 30;

export default function GameScreen({ playerName, onGameOver }) {
  const [snake, setSnake] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("UP");
  const [food, setFood] = useState({ x: 2, y: 2 });
  const [gift, setGift] = useState({ x: 7, y: 7 });
  const [huntsman, setHuntsman] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false); // <--- verhindert Schleifen

  const gameLoopRef = useRef();

  useEffect(() => {
    gameLoopRef.current = setInterval(() => {
      if (!gameEnded) {
        moveSnake();
        moveHuntsman();
        checkCollisions();
      }
    }, 300);

    return () => clearInterval(gameLoopRef.current);
  }, [snake, direction, gameEnded]);

  const moveSnake = () => {
    let head = { ...snake };

    if (direction === "UP") head.y--;
    if (direction === "DOWN") head.y++;
    if (direction === "LEFT") head.x--;
    if (direction === "RIGHT") head.x++;

    setSnake(head);

    // Food sammeln
    if (head.x === food.x && head.y === food.y) {
      setScore(score + 1);
      placeFood();
    }

    // Gift berührt: Game Over
    if (head.x === gift.x && head.y === gift.y) {
      endGame("Du hast den Giftapfel berührt!");
    }
  };

  const moveHuntsman = () => {
    let x = huntsman.x;
    let y = huntsman.y;

    if (x < snake.x) x++;
    if (x > snake.x) x--;
    if (y < snake.y) y++;
    if (y > snake.y) y--;

    setHuntsman({ x, y });
  };

  const checkCollisions = () => {
    // Wand
    if (snake.x < 0 || snake.x >= COLS || snake.y < 0 || snake.y >= ROWS) {
      endGame("Du bist gegen die Wand gelaufen!");
    }

    // Huntsman
    if (snake.x === huntsman.x && snake.y === huntsman.y) {
      endGame("Der Huntsman hat dich erwischt!");
    }
  };

  const endGame = (message) => {
    if (gameEnded) return; // verhindert Wiederholung
    setGameEnded(true);
    clearInterval(gameLoopRef.current);
    // callback zum MainScreen
    onGameOver(score);
  };

  const placeFood = () => {
    setFood({
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    });
  };

  const placeGift = () => {
    setGift({
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    });
  };

  // Swipe gesteuert
  const gesture = Gesture.Pan().onUpdate((e) => {
    const { translationX, translationY } = e;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) setDirection("RIGHT");
      else setDirection("LEFT");
    } else {
      if (translationY > 0) setDirection("DOWN");
      else setDirection("UP");
    }
  });

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        <Text style={styles.title}>SnowWhite Snake</Text>
        <Text style={styles.score}>Score: {score}</Text>
        <View
          style={{
            width: COLS * CELL_SIZE,
            height: ROWS * CELL_SIZE,
            backgroundColor: "black",
          }}
        >
          <View
            style={{
              position: "absolute",
              left: snake.x * CELL_SIZE,
              top: snake.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: "white",
            }}
          />
          <View
            style={{
              position: "absolute",
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: "green",
            }}
          />
          <View
            style={{
              position: "absolute",
              left: gift.x * CELL_SIZE,
              top: gift.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: "red",
            }}
          />
          <View
            style={{
              position: "absolute",
              left: huntsman.x * CELL_SIZE,
              top: huntsman.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: "yellow",
            }}
          />
        </View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 32, fontWeight: "bold", color: "white", marginBottom: 10 },
  score: { fontSize: 20, color: "white", marginBottom: 10 },
});
