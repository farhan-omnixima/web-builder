"use client";
import { Puck, Data } from "@measured/puck";
import '@measured/puck/puck.css';
import { config } from "@/components/builder-components";
import Header from "@/components/builder/Header";

const initialData = {};

const save = (data: Data) => {
  console.log("Data saved", data);
};

export default function Editor() {
  return (
    <>
      <Puck
        config={config}
        data={initialData}
        onPublish={save}
        overrides={{
          header: ({ actions }) => (
            <header className="flex flex-col justify-between">
              <span>My header</span>
              <div>{actions}</div>
            </header>
          ),
          headerActions: ({ children }) => (
            <>
              {children}
              <button onClick={() => console.log("Button Clicked")}>Click me</button>
            </>
          ),
        }}
      />
    </>
  );
}
