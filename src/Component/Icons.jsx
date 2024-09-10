import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";
import Lottie from "lottie-web";

const ICON = require("https://cdn.lordicon.com/wsdieofl.json");

export default function PlayOnce() {
  const playerRef = useRef < Lottie > null;

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  return <Lottie ref={playerRef} icon={ICON} size={96} />;
}
