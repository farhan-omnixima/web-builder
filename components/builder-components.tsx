"use client";
import { Config, DropZone } from "@measured/puck";
import { Key } from "react";


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
      components: ["Card", "Section", "Logos"],
      title: "Other",
      defaultExpanded: true,
    },
  },
  components: {
    Heading: {
      fields: {
        children: {
          type: "text",
          label: "Heading",
        },
        size: {
          type: "select",
          label: "Size",
          options: [
            { value: "text-lg", label: "XS" },
            { value: "text-xl", label: "S" },
            { value: "text-2xl", label: "M" },
            { value: "text-3xl", label: "L" },
            { value: "text-4xl", label: "XL" },
            { value: "text-5xl", label: "XXL" },
            { value: "text-6xl", label: "XXXL" },
            { value: "text-7xl", label: "XXXXL" },
          ],
        },
        tag: {
          type: "select",
          label: "HTML Tag",
          options: [
            { value: "h1", label: "h1" },
            { value: "h2", label: "h2" },
            { value: "h3", label: "h3" },
            { value: "h4", label: "h4" },
            { value: "h5", label: "h5" },
            { value: "h6", label: "h6" },
          ],
        },
        align: {
          type: "radio",
          label: "Alignment",
          options: [
            { value: "text-left", label: "Left" },
            { value: "text-center", label: "Center" },
            { value: "text-right", label: "Right" },
          ],
        },
        padding: {
          type: "select",
          label: "Padding",
          options: [
            { value: "p-0", label: "None" },
            { value: "p-2", label: "Small" },
            { value: "p-4", label: "Medium" },
            { value: "p-6", label: "Large" },
          ],
        },
        margin: {
          type: "select",
          label: "Margin",
          options: [
            { value: "m-0", label: "None" },
            { value: "m-2", label: "Small" },
            { value: "m-4", label: "Medium" },
            { value: "m-6", label: "Large" },
          ],
        },
      },
      defaultProps: {
        children: "Heading",
        size: "text-3xl",
        tag: "h1",
        align: "text-left",
        padding: "p-0",
        margin: "m-0",
      },
      render: ({ children, size, tag, align, padding, margin }) => {
        const Tag = tag as keyof JSX.IntrinsicElements;
        const className = `${size} ${align} ${padding} ${margin} font-semibold`;

        return <Tag className={className}>{children}</Tag>;
      },
    },
    Text: {
      fields: {
        children: {
          type: "text",
          label: "Text",
        },
        size: {
          type: "select",
          label: "Size",
          options: [
            { value: "text-xs", label: "XS" },
            { value: "text-sm", label: "S" },
            { value: "text-base", label: "M" },
            { value: "text-lg", label: "L" },
            { value: "text-xl", label: "XL" },
            { value: "text-2xl", label: "XXL" },
            { value: "text-3xl", label: "XXXL" },
            { value: "text-4xl", label: "XXXXL" },
          ],
        },
        color: {
          type: "text",
          label: "Color (#hex)",
        },
        align: {
          type: "radio",
          label: "Alignment",
          options: [
            { value: "text-left", label: "Left" },
            { value: "text-center", label: "Center" },
            { value: "text-right", label: "Right" },
          ],
        },
        padding: {
          type: "select",
          label: "Padding",
          options: [
            { value: "p-0", label: "None" },
            { value: "p-2", label: "Small" },
            { value: "p-4", label: "Medium" },
            { value: "p-6", label: "Large" },
          ],
        },
        margin: {
          type: "select",
          label: "Margin",
          options: [
            { value: "m-0", label: "None" },
            { value: "m-2", label: "Small" },
            { value: "m-4", label: "Medium" },
            { value: "m-6", label: "Large" },
          ],
        },
      },
      defaultProps: {
        children: "Text",
        color: "#000000",
        size: "text-base",
        align: "text-left",
        padding: "p-0",
        margin: "m-0",
      },
      render: ({
        children,
        size,
        align,
        padding,
        margin,
        color,
      }: {
        children: string;
        size: string;
        align: string;
        padding: string;
        margin: string;
        color: string;
      }) => {
        const style = { color: color };
        const className = `${size} ${align} ${padding} ${margin}`;

        return (
          <p className={className} style={style}>
            {children}
          </p>
        );
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
          getItemSummary: (col, id) =>
            `Column ${id! + 1}, span ${
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
      defaultProps: {
        distribution: "auto",
        columns: [{}, {}],
      },
      render: ({ columns, distribution }) => {
        return (
          <div
            className={`flex min-h-0 min-w-0 flex-col gap-6 md:grid ${
              distribution === "manual"
                ? "grid-cols-12"
                : `grid-cols-${columns.length}`
            }`}
          >
            {columns.map(
              ({ span }: { span: number }, idx: Key | null | undefined) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    span && distribution === "manual"
                      ? `col-span-${Math.max(Math.min(span, 12), 1)}`
                      : ""
                  }`}
                >
                  <DropZone
                    zone={`column-${idx}`}
                    disallow={["Hero", "Logos", "Stats"]}
                  />
                </div>
              ),
            )}
          </div>
        );
      },
    },
    Flex: {
      fields: {
        gap: {
          type: "select",
          label: "Gap",
          options: [
            { value: "2", label: "Small" },
            { value: "4", label: "Medium" },
            { value: "6", label: "Large" },
            { value: "8", label: "Extra Large" },
          ],
        },
        minWidth: {
          type: "number",
          label: "Minimum Width (px)",
          min: 0,
        },
        zones: {
          type: "array",
          label: "Flex Box",
          getItemSummary: (_, id) => `Flexbox ${id! + 1}`,
          arrayFields: {
            name: {
              type: "text",
              label: "Flexbox Name",
            },
          },
        },
      },
      defaultProps: {
        gap: "4",
        minWidth: 356,
        zones: [{ name: "left" }, { name: "right" }],
      },
      render: ({ gap, minWidth, zones }) => {
        return (
          <div className={`flex flex-wrap gap-${gap} w-full`}>
            {zones.map(
              (zone: { name: string }, index: Key | null | undefined) => (
                <div
                  key={index}
                  style={{
                    minWidth: `${minWidth}px`,
                    flexGrow: 1,
                    flexBasis: `${minWidth}px`,
                  }}
                >
                  <DropZone zone={zone.name || `flexbox-${index}`} />
                </div>
              ),
            )}
          </div>
        );
      },
    },
    "Vertical Space": {
      fields: {
        size: {
          type: "select",
          label: "Size",
          options: [
            { value: "2", label: "Extra Small" },
            { value: "4", label: "Small" },
            { value: "6", label: "Medium" },
            { value: "8", label: "Large" },
            { value: "12", label: "Extra Large" },
            { value: "16", label: "2x Large" },
            { value: "20", label: "3x Large" },
            { value: "24", label: "4x Large" },
            { value: "32", label: "5x Large" },
            { value: "40", label: "6x Large" },
            { value: "48", label: "7x Large" },
            { value: "56", label: "8x Large" },
            { value: "64", label: "9x Large" },
            { value: "72", label: "10x Large" },
          ],
        },
      },
      defaultProps: {
        size: "6",
      },
      render: ({ size }) => {
        const sizeClass = `h-${size}`;
        return <div className={sizeClass} />;
      },
    },
    "Button Group": {
      fields: {
        children: {
          type: "text",
          label: "Button Text",
        },
        backgroundColor: {
          type: "text",
          label: "Background Color (#hex)",
        },
        size: {
          type: "select",
          label: "Size",
          options: [
            { value: "px-2 py-1", label: "Small" },
            { value: "px-4 py-2", label: "Medium" },
            { value: "px-6 py-3", label: "Large" },
            { value: "px-8 py-4", label: "Extra Large" },
            { value: "px-10 py-5", label: "2x Large" },
            { value: "px-12 py-6", label: "3x Large" },
          ],
        },
        textColor: {
          type: "text",
          label: "Text Color (#hex)",
        },
        borderRadius: {
          type: "select",
          label: "Border Radius",
          options: [
            { value: "rounded-none", label: "None" },
            { value: "rounded-sm", label: "Small" },
            { value: "rounded-md", label: "Medium" },
            { value: "rounded-lg", label: "Large" },
            { value: "rounded-full", label: "Full" },
          ],
        },
        alignment: {
          type: "radio",
          label: "Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
      },
      defaultProps: {
        children: "Button",
        backgroundColor: "#000000",
        size: "px-4 py-2",
        textColor: "#ffffff",
        borderRadius: "rounded-md",
        alignment: "left",
      },
      render: ({
        children,
        backgroundColor,
        size,
        textColor,
        borderRadius,
        alignment,
      }: {
        children: string;
        backgroundColor: string;
        size: string;
        textColor: string;
        borderRadius: string;
        alignment: string;
      }) => {
        const buttonStyle = {
          backgroundColor: backgroundColor,
          color: textColor,
        };
        const containerClassName = `flex ${alignment === "center" ? "justify-center" : alignment === "right" ? "justify-end" : "justify-start"}`;
        const buttonClassName = `${size} ${borderRadius}`;

        return (
          <div className={containerClassName}>
            <button className={buttonClassName} style={buttonStyle}>
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
          label: "Icon (SVG)",
        },
        title: {
          type: "text",
          label: "Title",
        },
        description: {
          type: "text",
          label: "Description",
        },
      },
      defaultProps: {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`,
        title: "Card Title",
        description: "Card Description",
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
            <div className="rounded-full bg-gray-200 p-2" dangerouslySetInnerHTML={{ __html: icon }}></div>
            <h2 className="p-2 text-2xl font-semibold">{title}</h2>
            <p className="p-2">{description}</p>
          </div>
        );
      },
    },    
    Section: {
      fields: {
        title: {
          type: "text",
        },
        description: {
          type: "text",
        },
        image: {
          type: "text",
        },
      },
      render: ({
        title,
        description,
        image,
      }: {
        title: string;
        description: string;
        image: string;
      }) => {
        return (
          <div className="flex flex-col items-center justify-center bg-gray-200 p-4">
            <img src={image} alt={title} className="h-32 w-32 rounded-full" />
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p>{description}</p>
          </div>
        );
      },
    },
  },
};
