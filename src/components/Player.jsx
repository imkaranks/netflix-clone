import { useState } from "react";
import { motion } from "framer-motion";
import { close } from "@/assets/images";
import useVideo from "@/hooks/useVideo";

function Player() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { trailerUrl, setPlayerHidden } = useVideo();

  return (
    <motion.div
      className="fixed right-4 bottom-4"
      initial={{ scale: 0 }}
      animate={{ scale: isVideoLoaded ? 1 : 0 }}
    >
      <button
        className="absolute right-0 top-0 bg-red-600 p-1"
        onClick={() => setPlayerHidden(true)}
      >
        <img src={close} alt="close" width="20px" height="20px" />
      </button>
      <iframe
        src={trailerUrl}
        allowFullScreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen"
        msallowfullscreen="msallowfullscreen"
        oallowfullscreen="oallowfullscreen"
        webkitallowfullscreen="webkitallowfullscreen"
        className="aspect-video w-full max-w-sm"
        onLoad={() => setIsVideoLoaded(true)}
      />
    </motion.div>
  );
}

export default Player;
