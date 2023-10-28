import { Box, Heading } from "@radix-ui/themes";
import { useQuery } from "react-query";

import { MessageDomain } from "../domains/Message";
import { useIsConnected } from "../hooks/useIsConnected";

import { MessageCard } from "./MessageCard";

export function List() {
  const { data, isLoading } = useQuery("messages", MessageDomain.getMessages);
  const { isConnected } = useIsConnected();

  if (!isConnected) {
    return null;
  }

  if (isLoading) {
    return <Box className="p-20">Loading...</Box>;
  }

  if (data?.length === 0) {
    return (
      <Box className="py-20">
        <Heading size="8" className="mb-8">
          Messages
        </Heading>
        <Box className="text-gray-10">No messages yet 😢</Box>
      </Box>
    );
  }

  return (
    <Box className="py-20">
      <Heading size="8" className="mb-8">
        Messages
      </Heading>
      <Box className="flex flex-col gap-4">
        {data?.map(({ id, sender, msg }) => (
          <MessageCard key={id} sender={sender} msg={msg} />
        ))}
      </Box>
    </Box>
  );
}
