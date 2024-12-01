import RoomProviderWrapper from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

const DocLayout = async ({ children,params }: { children: React.ReactNode,params:{id:string} }) => {
  const { userId } = await auth();
    const { id } = params;

  if (!userId) {
    return <div>You need to log in to access this page.</div>;
  }

  return <RoomProviderWrapper roomId={id}>{children}</RoomProviderWrapper>;
};

export default DocLayout;
