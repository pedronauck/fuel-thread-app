import { Box } from "@radix-ui/themes";

import { Form } from "./components/Form";
import { List } from "./components/List";

export function Messages() {
  return (
    <Box className="grid grid-cols-[1.5fr_2fr] px-20 gap-32">
      <Form />
      <List />
    </Box>
  );
}
