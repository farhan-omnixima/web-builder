"use client";
import { Config, DropZone } from "@measured/puck";

export const config: Config = {
  categories: {
    layout: {
      components: ["Columns", "Flex", "Vertical Space"],
      title: "Layout",
      defaultExpanded: true,
    },
    typography: {
      components: ["Heading", "Text"],
      title: "Text",
      defaultExpanded: true,
    },
    actions: {
      components: ["Button Group"],
      title: "Actions",
      defaultExpanded: true,
    },
    other: {
      components: ["Card", "Hero", "Logos", "Stats"],
      title: "Other",
      defaultExpanded: true,
    },
  },
  components: {
    Heading: {
      fields: {
        children: {
          type: "text",
        },
      },
      render: ({ children }: { children: string }) => {
        return <h1 className="text-3xl font-semibold">{children}</h1>;
      },
    },
    Text: {
      fields: {
        children: {
          type: "text",
        },
      },
      render: ({ children }: { children: string }) => {
        return <p className="text-xl">{children}</p>;
      },
    },
    Columns: {
      fields: {
        distribution: {
          type: "radio",
          options: [
            {
              value: "auto",
              label: "Auto",
            },
            {
              value: "manual",
              label: "Manual",
            },
          ],
        },
        columns: {
          type: "array",
          defaultValue: [{ span: 6 }, { span: 6 }],
          getItemSummary: (col, id) =>
            `Column ${id + 1}, span ${
              col.span ? Math.max(Math.min(col.span, 12), 1) : "auto"
            }`,
          arrayFields: {
            span: {
              label: "Span (1-12)",
              type: "number",
              min: 2,
              max: 12,
            },
          },
        },
      },
      render: ({ columns = [{ span: 6 }, { span: 6 }], distribution }) => {
        return (
          <div
            className={`flex min-h-0 min-w-0 flex-col gap-6 md:grid ${
              distribution === "manual"
                ? "grid-cols-12"
                : `grid-cols-${columns.length}`
            }`}
          >
            {columns.map(({ span }, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gridColumn:
                    span && distribution === "manual"
                      ? `span ${Math.max(Math.min(span, 12), 1)}`
                      : "",
                }}
              >
                <DropZone
                  zone={`column-${idx}`}
                  disallow={["Hero", "Logos", "Stats"]}
                />
              </div>
            ))}
          </div>
        );
      },
    },
    
    
    
    Flex: {
      render: () => {
        return (
          <div className="flex flex-row gap-4">
            <DropZone zone="left" />
            <DropZone zone="right" />
          </div>
        );
      },
    },
    "Vertical Space": {
      render: () => {
        return <div className="h-8" />;
      },
    },
    "Button Group": {
      fields: {
        children: {
          type: "text",
        },
      },
      render: ({ children }: { children: string }) => {
        return (
          <div className="flex gap-4">
            <button className="rounded bg-blue-500 px-4 py-2 text-white">
              {children}
            </button>
          </div>
        );
      },
    },
    Card: {
      fields: {
        icon: {
          type: "text",
        },
        title: {
          type: "text",
        },
        description: {
          type: "text",
        },
      },
      render: ({
        icon,
        title,
        description,
      }: {
        icon: string;
        title: string;
        description: string;
      }) => {
        return (
          <div className="flex flex-col items-center justify-center rounded bg-white p-4 shadow">
            <i className={`${icon} rounded-full bg-gray-200 p-2`}></i>
            <h2 className="p-2 text-2xl font-semibold">{title}</h2>
            <p className="p-2">{description}</p>
          </div>
        );
      },
    },
  },
};
