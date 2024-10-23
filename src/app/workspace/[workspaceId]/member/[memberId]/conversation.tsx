import { Loader } from "lucide-react";

import { useMemberId } from "@/hooks/use-member-id";

import { Id } from "../../../../../../convex/_generated/dataModel";

import { useGetMember } from "@/features/members/api/use-get-member";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import { Header } from "./header";

interface ConversationProps {
  id: Id<"conversations">
}

export const Conversation = ({ id }: ConversationProps) => {
  const memberId = useMemberId();

  const { data: member, isLoading: memberLoading } = useGetMember({ id: memberId });
  const { results, status, loadMore } = useGetMessages({
    conversationId: id
  })

  if (memberLoading || status ==="LoadingFirstPage") {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <Header />
    </div>
  )
}