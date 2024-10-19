'use client'

import { Loader, TriangleAlert } from "lucide-react";

import { useChannelId } from "@/hooks/use-channel-id";

import { UseGetChannel } from "@/features/channels/api/use-get-channel";
import { useGetMessages } from "@/features/messages/api/use-get-messages";

import { Header } from "./header";
import { ChatInput } from "./chat-input";

import { MessageList } from "@/components/message-list";

const ChannelIdPage = () => {
  const channelId = useChannelId();

  const { results, status, loadMore } = useGetMessages({ channelId })
  const { data: channel, isLoading: channelLoading } = UseGetChannel({ id: channelId });

  if (channelLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!channel) {
    return (
      <div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Channel not found</span>
      </div>
    )
  }
  return (
    <div className="flex flex-col h-full">
      <Header title={channel.name} />
      <MessageList 
        data={results}
        channelName={channel.name}
        channelCreationTime={channel._creationTime}
        loadMore={loadMore}
        isLoadingMore={status==="LoadingMore"}
        canLoadMore={status==="CanLoadMore"}
      />
      <ChatInput placeholder={`Message # ${channel.name}`} />
    </div>
  );
}

export default ChannelIdPage;