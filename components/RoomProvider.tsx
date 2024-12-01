"use client";

// import { LiveList, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import LoadingSpinner from "./LoadingSpinner";
import LiveblocksProviderWrapper from "./LiveblocksProvider";

const RoomProviderWrapper = ({
  roomId,
  children,
}: {
  roomId: string;
  children: React.ReactNode;
}) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
      //   initialStorage={{
      //     people: new LiveList([new LiveObject({name: "Alice",age:30})]),
      //   }}
    >
      <ClientSideSuspense fallback={<LoadingSpinner />}>
        <LiveblocksProviderWrapper>
        {children}
        </LiveblocksProviderWrapper>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default RoomProviderWrapper;
