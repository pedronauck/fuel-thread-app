import { Box, Flex, Text } from "@radix-ui/themes";
import { IconUser } from "@tabler/icons-react";

import { shortAddress } from "../utils/address";

type MessageCardProps = {
  msg: string;
  sender: { value: string };
};
export function MessageCard({ msg, sender }: MessageCardProps) {
  return (
    <Box className="bg-gray-2 rounded">
      <Box color="gray" className="p-4">
        {msg}
      </Box>
      <Flex align="center" gap="2" className="p-3 pt-2 border-t border-gray-3">
        <Flex align="center" gap="2" className="flex-1">
          <IconUser size={18} className="text-gray-8" />
          <Text className="text-gray-10">From:</Text>
          <Text>{shortAddress(sender.value)}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
