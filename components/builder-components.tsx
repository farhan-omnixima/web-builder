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
          type: "number",
          label: "Font Size (px)",
          min: 1,
        },
        weight: {
          type: "select",
          label: "Font Weight",
          options: [
            { value: "thin", label: "Thin" },
            { value: "light", label: "Light" },
            { value: "normal", label: "Normal" },
            { value: "semibold", label: "Semibold" },
            { value: "bold", label: "Bold" },
            { value: "black", label: "Black" },
          ],
        },
        tag: {
          type: "select",
          label: "HTML Tag",
          options: [
            { value: "h1", label: "H1" },
            { value: "h2", label: "H2" },
            { value: "h3", label: "H3" },
            { value: "h4", label: "H4" },
            { value: "h5", label: "H5" },
            { value: "h6", label: "H6" },
          ],
        },
        backgroundColor: {
          type: "text",
          label: "Background Color (#hex)",
        },
        textColor: {
          type: "text",
          label: "Text Color (#hex)",
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
          type: "object",
          label: "Padding",
          objectFields: {
            left: {
              type: "number",
              label: "Left (px)",
              min: 0,
            },
            right: {
              type: "number",
              label: "Right (px)",
              min: 0,
            },
            top: {
              type: "number",
              label: "Top (px)",
              min: 0,
            },
            bottom: {
              type: "number",
              label: "Bottom (px)",
              min: 0,
            },
          },
        },
        margin: {
          type: "object",
          label: "Margin (px)",
          objectFields: {
            left: {
              type: "number",
              label: "Left (px)",
              min: 0,
            },
            right: {
              type: "number",
              label: "Right (px)",
              min: 0,
            },
            top: {
              type: "number",
              label: "Top (px)",
              min: 0,
            },
            bottom: {
              type: "number",
              label: "Bottom (px)",
              min: 0,
            },
          },
        },
      },
      defaultProps: {
        children: "Heading",
        size: 36,
        weight: "semibold",
        tag: "h1",
        backgroundColor: "#FFFFFF",
        textColor: "#000000",
        align: "text-left",
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
        margin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      render: ({
        children,
        size,
        weight,
        tag,
        backgroundColor,
        textColor,
        align,
        padding,
        margin,
      }) => {
        const Tag = tag as keyof JSX.IntrinsicElements;
        const style = {
          paddingTop: `${padding.top}px`,
          paddingRight: `${padding.right}px`,
          paddingBottom: `${padding.bottom}px`,
          paddingLeft: `${padding.left}px`,
          marginTop: `${margin.top}px`,
          marginRight: `${margin.right}px`,
          marginBottom: `${margin.bottom}px`,
          marginLeft: `${margin.left}px`,
          backgroundColor: backgroundColor,
          color: textColor,
          fontSize: `${size}px`,
        };
        const className = `${align} ${weight}`;

        return (
          <Tag className={className} style={style}>
            {children}
          </Tag>
        );
      },
    },
    Text: {
      fields: {
        children: {
          type: "text",
          label: "Text",
        },
        size: {
          type: "number",
          label: "Font Size (px)",
          min: 1,
        },
        weight: {
          type: "select",
          label: "Font Weight",
          options: [
            { value: "thin", label: "Thin" },
            { value: "light", label: "Light" },
            { value: "normal", label: "Normal" },
            { value: "semibold", label: "Semibold" },
            { value: "bold", label: "Bold" },
            { value: "black", label: "Black" },
          ],
        },
        textColor: {
          type: "text",
          label: "Text Color (#hex)",
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
          type: "object",
          label: "Padding",
          objectFields: {
            left: {
              type: "number",
              label: "Left (px)",
              min: 0,
            },
            right: {
              type: "number",
              label: "Right (px)",
              min: 0,
            },
            top: {
              type: "number",
              label: "Top (px)",
              min: 0,
            },
            bottom: {
              type: "number",
              label: "Bottom (px)",
              min: 0,
            },
          },
        },
        margin: {
          type: "object",
          label: "Margin (px)",
          objectFields: {
            left: {
              type: "number",
              label: "Left (px)",
              min: 0,
            },
            right: {
              type: "number",
              label: "Right (px)",
              min: 0,
            },
            top: {
              type: "number",
              label: "Top (px)",
              min: 0,
            },
            bottom: {
              type: "number",
              label: "Bottom (px)",
              min: 0,
            },
          },
        },
      },
      defaultProps: {
        children: "Text",
        size: 16,
        weight: "normal",
        textColor: "#000000",
        align: "text-left",
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
        margin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      render: ({
        children,
        size,
        weight,
        textColor,
        align,
        padding,
        margin,
      }) => {
        const style = {
          paddingTop: `${padding.top}px`,
          paddingRight: `${padding.right}px`,
          paddingBottom: `${padding.bottom}px`,
          paddingLeft: `${padding.left}px`,
          marginTop: `${margin.top}px`,
          marginRight: `${margin.right}px`,
          marginBottom: `${margin.bottom}px`,
          marginLeft: `${margin.left}px`,
          color: textColor,
          fontSize: `${size}px`,
        };
        const className = `${align} ${weight}`;

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
                  <DropZone zone={`column-${idx}`} />
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
            <div
              className="rounded-full bg-gray-200 p-2"
              dangerouslySetInnerHTML={{ __html: icon }}
            ></div>
            <h2 className="semibold p-2 text-2xl">{title}</h2>
            <p className="p-2">{description}</p>
          </div>
        );
      },
    },
    Section: {
      fields: {
        display: {
          type: "select",
          label: "Display",
          options: [
            { value: "block", label: "Block" },
            { value: "flex", label: "Flex" },
            { value: "grid", label: "Grid" },
            { value: "inline", label: "Inline" },
            { value: "inline-block", label: "Inline Block" },
          ],
        },
        margin: {
          type: "object",
          label: "Margin (px)",
          objectFields: {
            top: { type: "number", label: "Top" },
            right: { type: "number", label: "Right" },
            bottom: { type: "number", label: "Bottom" },
            left: { type: "number", label: "Left" },
          },
        },
        padding: {
          type: "object",
          label: "Padding (px)",
          objectFields: {
            top: { type: "number", label: "Top" },
            right: { type: "number", label: "Right" },
            bottom: { type: "number", label: "Bottom" },
            left: { type: "number", label: "Left" },
          },
        },
        width: {
          type: "text",
          label: "Width",
        },
        height: {
          type: "text",
          label: "Height",
        },
        overflow: {
          type: "select",
          label: "Overflow",
          options: [
            { value: "visible", label: "Visible" },
            { value: "hidden", label: "Hidden" },
            { value: "scroll", label: "Scroll" },
            { value: "auto", label: "Auto" },
          ],
        },
        backgroundColor: {
          type: "text",
          label: "Background Color (#hex)",
        },
        backgroundImage: {
          type: "text",
          label: "Background Image URL",
        },
        borderRadius: {
          type: "number",
          label: "Border Radius (px)",
        },
        boxShadow: {
          type: "text",
          label: "Box Shadow",
        },
        position: {
          type: "select",
          label: "Position",
          options: [
            { value: "static", label: "Static" },
            { value: "relative", label: "Relative" },
            { value: "absolute", label: "Absolute" },
            { value: "fixed", label: "Fixed" },
            { value: "sticky", label: "Sticky" },
          ],
        },
        zIndex: {
          type: "number",
          label: "Z-Index",
        },
        divider: {
          type: "object",
          label: "Divider",
          objectFields: {
            show: {
              type: "radio",
              label: "Show Divider",
              options: [
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ],
            },
            color: { type: "text", label: "Divider Color (#hex)" },
            thickness: { type: "number", label: "Divider Thickness (px)" },
          },
        },
      },
      resolveFields: async (data, { fields }) => {
        if (data.props.display === "flex") {
          return {
            flex: {
              type: "object",
              label: "Flex",
              objectFields: {
                flexWrap: {
                  type: "radio",
                  label: "Flex Wrap",
                  options: [
                    { value: "flex-nowrap", label: "No Wrap" },
                    { value: "flex-wrap", label: "Wrap" },
                    { value: "flex-wrap-reverse", label: "Wrap Reverse" },
                  ],
                },
                direction: {
                  type: "radio",
                  label: "Direction",
                  options: [
                    { value: "flex-row", label: "Row" },
                    { value: "flex-row-reverse", label: "Row Reverse" },
                    { value: "flex-column", label: "Column" },
                    { value: "flex-column-reverse", label: "Column Reverse" },
                  ],
                },
                alignItems: {
                  type: "select",
                  label: "Align Items",
                  options: [
                    { value: "flex-start", label: "Start" },
                    { value: "flex-end", label: "End" },
                    { value: "center", label: "Center" },
                    { value: "baseline", label: "Baseline" },
                    { value: "stretch", label: "Stretch" },
                  ],
                },
                justifyItems: {
                  type: "select",
                  label: "Justify Items",
                  options: [
                    { value: "flex-start", label: "Start" },
                    { value: "flex-end", label: "End" },
                    { value: "center", label: "Center" },
                    { value: "space-between", label: "Space Between" },
                    { value: "space-around", label: "Space Around" },
                    { value: "space-evenly", label: "Space Evenly" },
                  ],
                },
                flexGrow: {
                  type: "number",
                  label: "Grow",
                  min: 0,
                },
                flexShrink: {
                  type: "number",
                  label: "Shrink",
                  min: 0,
                },
                columnGap: {
                  type: "number",
                  label: "Column Gap",
                  min: 0,
                },
                rowGap: {
                  type: "number",
                  label: "Row Gap",
                  min: 0,
                },
              },
            },
            ...fields,
          };
        } else if (data.props.display === "grid") {
          return {
            grid: {
              type: "object",
              label: "Grid",
              objectFields: {
                templateColumns: {
                  type: "text",
                  label: "Template Columns",
                },
                templateRows: {
                  type: "text",
                  label: "Template Rows",
                },
                gap: {
                  type: "number",
                  label: "Gap",
                  min: 0,
                },
              },
            },
            ...fields,
          };
        }
        return fields;
      },
      defaultProps: {
        display: "block",
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
        width: "100%",
        height: "100%",
        overflow: "visible",
        backgroundColor: "#AF0000",
        backgroundImage: "",
        borderRadius: 0,
        boxShadow: "5px",
        position: "static",
        zIndex: 0,
        divider: {
          show: false,
          color: "#000000",
          thickness: 1,
        },
      },
      render: ({
        title,
        children,
        display,
        margin,
        padding,
        width,
        height,
        overflow,
        backgroundColor,
        backgroundImage,
        borderRadius,
        boxShadow,
        position,
        zIndex,
        divider,
        flex,
        grid,
      }) => {
        const style = {
          display,
          width: `calc(${width} - ${margin.left + margin.right}px)`,
          maxWidth: "100%",
          marginTop: `${margin.top}px`,
          marginRight: `${margin.right}px`,
          marginBottom: `${margin.bottom}px`,
          marginLeft: `${margin.left}px`,
          paddingTop: `${padding.top}px`,
          paddingRight: `${padding.right}px`,
          paddingBottom: `${padding.bottom}px`,
          paddingLeft: `${padding.left}px`,
          height,
          overflow,
          backgroundColor,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: `${borderRadius}px`,
          boxShadow,
          position,
          zIndex,
        };

        let flexStyle = "";
        let gridStyle = "";
        if (display === "flex" && flex) {
          flexStyle = `flex ${flex.flexWrap} ${flex.direction} ${flex.alignItems} ${flex.justifyItems} ${flex.flexGrow} ${flex.flexShrink} ${flex.columnGap} ${flex.rowGap}`;
        } else if (display === "grid" && grid) {
          gridStyle = `grid ${grid.templateColumns} ${grid.templateRows} ${grid.gap}`;
        }

        const dividerStyle = divider.show
          ? { borderBottom: `${divider.thickness}px solid ${divider.color}` }
          : {};

        return (
          <section
            className={`${display === "flex" && flex ? flexStyle : display === "grid" && grid ? gridStyle : ""}`}
            style={{ ...style, ...dividerStyle }}
          >
            <DropZone zone="section" />
          </section>
        );
      },
    },
  },
};
