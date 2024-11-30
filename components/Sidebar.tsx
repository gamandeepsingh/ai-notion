"use client";
import { MenuIcon } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import SidebarOptions from "./SidebarOptions";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

const Sidebar = () => {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });
  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  useEffect(() => {
    if (!data) return;
    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }

        return acc;
      },
      {
        owner: [],
        editor: [],
      }
    );

    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />
      <div className="flex py-4 flex-col items-start space-y-4 min-w-44 max-w-52">
        {groupedData.owner.length === 0 ? (
          <h2 className="text-gray-500 font-semibold text-sm">
            No Documnent Found
          </h2>
        ) : (
          <>
            <h2 className="text-gray-500 font-semibold text-sm">
              My Documents
            </h2>
            {groupedData.owner.map((doc) => (
              <SidebarOptions key={doc.id} id={doc.id} href={`/doc/${doc.id}`}/>
            ))}
          </>
        )}
      </div>

      {
        groupedData.editor.length > 0 && (
          <>
            <h2 className="text-gray-500 font-semibold text-sm">Shared with me</h2>
            {
              groupedData.editor.map((doc) => (
                <SidebarOptions key={doc.id} id={doc.id} href={`/docs/${doc.id}`}/>
              ))
            }
          </>
        )
      }
    </>
  );
  return (
    <div className="px-4 py-2 md:py-5 bg-gray-200">
      <div className="inline md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon size={40} className="p-2 hover:opacity-30 rounded-lg" />
          </SheetTrigger>
          <SheetContent side={"left"} className="">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div className="">{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
};

export default Sidebar;
