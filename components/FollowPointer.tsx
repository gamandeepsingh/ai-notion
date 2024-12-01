"use client";

import stringToColor from "@/lib/stringToColor";
import { motion} from "framer-motion";

const FollowPointer = ({
  info,
  x,
  y,
}: {
  info: {
    name: string;
    email: string;
    avatar: string;
  };
  x: number | undefined;
  y: number | undefined;
}) => {
  const color = stringToColor(info.email || "1");
  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity:0
      }}
    >
        <svg
        stroke={color}
        fill={color}
        strokeWidth="1"
        className={`h-6 w-6 text-[${color}] transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-[${color}] `}
        height={"1em"}
        width={"1em"}
        xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M20.606,2.081,2.606,9.8A1,1,0,0,0,2.858,11.7l8.258,1.18,1.18,8.258a1,1,0,0,0,1.909.252l7.714-18a1,1,0,0,0-1.313-1.313ZM13.771,17.328l-.781-5.47a1,1,0,0,0-.848-.848l-5.471-.781L19.1,4.9Z"/>
        </svg>
        <motion.div
        style={{
            backgroundColor: color,
          }}
          initial={{
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.5,
            opacity:0
          }}
        >
            <p className="px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full">{info?.name || info?.email}</p>
        </motion.div>
    </motion.div>
  );
};

export default FollowPointer;
