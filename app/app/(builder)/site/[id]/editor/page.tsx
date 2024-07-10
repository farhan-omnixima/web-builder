"use client";
import { ReactNode } from "react";
import { Config, Data, Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from "@/components/builder-components";

// Describe the initial data
const initialData = {};

// Save the data to your database
const save = (data: Data) => {
  console.log("Data saved", data);
};

// Render Puck editor
export default function Editor() {
  return <Puck config={config} data={initialData} onPublish={save} />;
}
