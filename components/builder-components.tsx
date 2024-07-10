'use client';
import { Config } from "@measured/puck";

export const config: Config = {
  components: {
    HeadingBlock: {
      fields: {
        children: {
          type: "text",
        },
      },
      render: ({ children }: { children: string }) => {
        return <h1>{children}</h1>;
      },
    },
  },
};
