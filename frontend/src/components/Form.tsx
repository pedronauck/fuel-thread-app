import { Box, Button, Heading, TextArea } from "@radix-ui/themes";
import { IconWalletOff, IconWallet, IconSend } from "@tabler/icons-react";
import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";

import { MessageDomain } from "../domains/Message";
import { fuelSDK } from "../hooks/useFuel";
import { useIsConnected } from "../hooks/useIsConnected";

export function Form() {
  const { isConnected } = useIsConnected();
  const [msg, setMessage] = useState("");
  const client = useQueryClient();
  const sendMutation = useMutation(MessageDomain.send, {
    onSuccess: () => {
      client.invalidateQueries("messages");
      setMessage("");
    },
  });

  const connectMutation = useMutation(() => fuelSDK.connect());
  const desconnectMutation = useMutation(() => fuelSDK.disconnect(), {
    onSuccess: () => {
      client.invalidateQueries("messages");
    },
  });

  return (
    <Box className="py-20">
      <Button
        size="3"
        variant="soft"
        color={isConnected ? "red" : "green"}
        onClick={() => {
          if (isConnected) {
            desconnectMutation.mutate();
          } else {
            connectMutation.mutate();
          }
        }}
      >
        {isConnected ? <IconWalletOff size={18} /> : <IconWallet size={18} />}
        {isConnected ? "Disconnect" : "Connect"}
      </Button>
      <Box className="flex flex-col gap-4 mt-8 items-start">
        <Heading>Send Message</Heading>
        <Box className="grid grid-cols-[1fr_auto] w-full gap-4">
          <TextArea
            size="3"
            rows={4}
            className="w-full flex-1"
            value={sendMutation.isLoading ? "" : msg}
            placeholder={
              sendMutation.isLoading ? "Sending..." : "Type your message"
            }
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            size="4"
            className="w-32"
            color="green"
            variant="soft"
            style={{ height: "100%" }}
            onClick={() => sendMutation.mutate({ msg })}
            disabled={!isConnected || sendMutation.isLoading}
          >
            <IconSend size={18} />
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
