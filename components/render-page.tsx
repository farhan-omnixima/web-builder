"use client";

import { Data, Render } from "@measured/puck";
import { config } from "./builder-components";

const RenderPage = ({ data }: { data: Data }) => {
  return <Render config={config} data={data} />;
};

export default RenderPage;
