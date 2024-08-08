import React, { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAppStore } from '@/store/store';
import MultipleSelector from '@/components/ui/multipleSelect';
import { Input } from '@/components/ui/input';
import apiClient from '@/lib/api-client';
import { ADD_NEW_MEMBER_ROUTE } from '@/utils/constants';
import { toast } from 'sonner';
import { useToast } from '@/components/ui/use-toast';



const NewMembers = ({newMembers = []}) => {
    console.log("New Members: ", newMembers)

    const { openAddMemberModal, setOpenAddMemberModal, selectedChatData } = useAppStore();
    const { toast } = useToast();
    const dialogRef = useRef(null);
    const [searchMember, setSearchMember] = useState("");
    const [ allMembers, setAllMembers ] = useState(newMembers);
    const [ selectedMember, setSelectedMember ] = useState([]);

    const handleClickOutside = (event) => {
        if(dialogRef.current && dialogRef.current.contains(event.target)){
            setOpenAddMemberModal(false);
        }
    }

    const addMember = async() => {
        if(selectedMember.length > 0){
            const response = await apiClient.post(ADD_NEW_MEMBER_ROUTE,{
                memberId: selectedMember.map((member) => member.value),
                channelId: selectedChatData._id
            },
            {
                withCredentials: true
            }
            )

            if(response.status === 200){
                toast({
                    variation: 'success',
                    description: "Members Added Successfully !!"
                })
            }else{
                toast({
                    variation: 'destructive',
                    description: "Unable to add Members"
                })
            }   
        }
        else{
            toast({
                variant: "destructive",
                description: "Select atleast 1 member",
            })
        }

        setOpenAddMemberModal(false);


        
    }
    

    return (
        <div>
        <Dialog open = {openAddMemberModal} onOpenChange = {() => setOpenAddMemberModal(false)} >
            <DialogContent className = "bg-[#181920] border-none text-white w-[400px]  flex flex-col">
                <DialogHeader>
                <DialogTitle> Add Members </DialogTitle>
                <DialogDescription>
                    
                </DialogDescription>
                </DialogHeader>

                <div className='flex justify-center flex-col items-center gap-4'>
                    <MultipleSelector
                        className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
                        defaultOptions = {allMembers}
                        placeholder = "Search Members"
                        value = {selectedMember}
                        onChange = {setSelectedMember}
                        emptyIndicator= {
                            <p className=" text-center h-10 text-lg leading-10 text-gray-600">
                                No results found
                            </p>

                        }
                     />
                    <button 
                        className='bg-emerald-600 rounded-xl p-3'
                        onClick = {addMember}
                    > 
                        Add Members 
                    </button>
                </div>
    
            </DialogContent>
        </Dialog>

        </div>
    )
}

export default NewMembers
