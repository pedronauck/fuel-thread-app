import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "react-query";

import { Messages } from "./Messages";

const queryClient = new QueryClient();

export function App() {
  return (
    // Provide the client to your App
    <Theme appearance="dark" accentColor="green">
      <QueryClientProvider client={queryClient}>
        <Messages />
      </QueryClientProvider>
    </Theme>
  );
}
