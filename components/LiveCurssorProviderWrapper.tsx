"use client";

import { useMyPresence, useOthers } from "@liveblocks/react";
import FollowPointer from "./FollowPointer";

const LiveCursorProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  // Use React.PointerEvent instead of PointerEvent
  const handlerPointerMove = (e: React.PointerEvent) => {
    updateMyPresence({
      cursor: {
        x: Math.floor(e.pageX),
        y: Math.floor(e.pageY),
      },
    });
  };

  const handlerPointerLeave = () => {
    updateMyPresence({
      cursor: null,
    });
  };

  return (
    <div onPointerMove={handlerPointerMove} onPointerLeave={handlerPointerLeave}>
      {others.filter((other)=> other.presence.cursor!== null).map(({connectionId,presence, info}) => (
        <FollowPointer
        key={connectionId}
        info={info}
        x={presence.cursor?.x}
        y={presence.cursor?.y}
        />
      ))}
      {children}
    </div>
  );
};

export default LiveCursorProviderWrapper;

