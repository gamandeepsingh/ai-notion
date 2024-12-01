"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocument } from "react-firebase-hooks/firestore";

const Document = ({id}:{id:string}) => {
        const [input, setInput] = useState<string>('')
        const [isUpdating, startTransition] = useTransition();
        const [data,loading,error] = useDocument(doc(db, "documents", id))

        useEffect(()=>{
            if(data){
                setInput(data.data()?.title)
            }
        },[data])

        const updateTitle = async (e:FormEvent) => {
            e.preventDefault();

            if(input.trim()){
                startTransition(async () => {
                    await updateDoc(doc(db, "documents", id),{
                        title: input
                    })
                })
            }
        }
  return (
    <div>
        <div className="flex max-w-6xl mx-auto justify-between pb-5">
            <form action="" onSubmit={updateTitle} className="flex  flex-1 gap-2 space-x-2 ">
                {/* update title */}
                <Input 
                placeholder="Title"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                 />
                 <Button disabled={isUpdating} type="submit">
                    {isUpdating ? 'Updating...' : 'Update'}
                 </Button>
                {/* if */}
                {/* IsOwner && InviteUser, DeleteUser */}
            </form>
        </div>
        <div>
            {/* ManageUsers */}

            {/* Avatars */}
        </div>
        {/* Collaborative Editor */}
    </div>
  )
}

export default Document
