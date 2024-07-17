"use client";
import { Config, DropZone } from "@measured/puck";
import { Key } from "react";

type ButtonProps = {
  label: string;
  href: string;
  bgColor: string;
  textColor: string;
  textSize: string;
  margin: string;
  padding: string;
  borderRadius: string;
  border: string;
  borderColor: string;
};

export const config: Config = {
  categories: {
    layout: {
      components: [
        "Section",
        "Container",
        "Column",
        "Flex",
        "Space",
      ],
      title: "Layout",
      defaultExpanded: true,
    },
    typography: {
      components: ["Heading", "Text"],
      title: "Text",
      defaultExpanded: true,
    },
    actions: {
      components: ["Buttons"],
      title: "Actions",
      defaultExpanded: true,
    },
    component: {
      components: ["Card", "Image"],
      title: "Components",
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
    Column: {
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
    Space: {
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
    Buttons: {
      fields: {
        buttons: {
          type: "array",
          getItemSummary: (item) => item.label || "Button",
          arrayFields: {
            label: { type: "text" },
            href: { type: "text" },
            bgColor: { type: "text", label: "Background Color (#hex)" },
            textColor: { type: "text", label: "Text Color (#hex)" },
            textSize: { type: "text", label: "Text Size (px)" },
            margin: { type: "text", label: "Margin (px)" },
            padding: { type: "text", label: "Padding (px)" },
            borderRadius: { type: "text", label: "Border Radius (px)" },
            border: { type: "text", label: "Border (px)" },
            borderColor: { type: "text", label: "Border Color (#hex)" },
          },
          defaultItemProps: {
            label: "Button",
            href: "#",
            bgColor: "#000000",
            textColor: "#FFFFFF",
            margin: "1px",
            padding: "2px",
            borderRadius: "5px",
            border: "0",
            borderColor: "#000000",
          },
        },
        align: {
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
        buttons: [
          {
            label: "Submit",
            href: "#",
            bgColor: "#000000",
            textColor: "#FFFFFF",
            textSize: "10px",
            margin: "10px",
            padding: "10px 20px",
            borderRadius: "30px",
            border: "1px",
            borderColor: "#00FF00",
          },
        ],
      },
      render: ({ buttons, align, puck }) => {
        const buttonStyle = (button: ButtonProps) => ({
          backgroundColor: button.bgColor,
          color: button.textColor,
          margin: `${button.margin}`,
          padding: `${button.padding}`,
          borderRadius: `${button.borderRadius}`,
          border: `${button.border} solid ${button.borderColor}`,
          fontSize: `${button.textSize}`,
        });
        return (
          <section className={`flex justify-${align}`}>
            <div className="">
              {buttons.map((button: ButtonProps, i: Key | null | undefined) => (
                <button
                  key={i}
                  onClick={() => (window.location.href = button.href)}
                  tabIndex={puck.isEditing ? -1 : undefined}
                  style={buttonStyle(button)}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </section>
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
    Container: {
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
        width: {
          type: "text",
          label: "Width",
        },
        height: {
          type: "text",
          label: "Height",
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
        margin: { top: 20, right: 0, bottom: 20, left: 0 },
        padding: { top: 15, right: 15, bottom: 15, left: 15 },
        width: "100%",
        height: "auto",
        overflow: "visible",
        backgroundColor: "#FFFFFF",
        backgroundImage: "",
        borderRadius: 0,
        boxShadow: "none",
        position: "static",
        zIndex: 0,
        divider: {
          show: false,
          color: "#000000",
          thickness: 1,
        },
        alignment: "center",
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
        alignment,
      }) => {
        const sectionStyle = {
          width: "calc(100%)",
          display: "flex",
          justifyContent:
            alignment === "center"
              ? "center"
              : alignment === "right"
                ? "flex-end"
                : "flex-start",
        };

        const style = {
          display,
          width: `${width}`,
          maxWidth: "95%",
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
          <section style={sectionStyle}>
            <div
              className={`${display === "flex" && flex ? flexStyle : display === "grid" && grid ? gridStyle : ""}`}
              style={{ ...style, ...dividerStyle }}
            >
              <DropZone zone="div" />
            </div>
          </section>
        );
      },
    },
    Image: {
      fields: {
        link: {
          type: "text",
          label: "Link URL",
        },
        imageUrl: {
          type: "text",
          label: "Select Image",
        },
        // imageUpload: {
        //   type: "external",
        //   label: "Upload Image",
        //   fetchList: async () => {
        //     return fetch("/api/images")
        //       .then((res) => res.json())
        //       .then((data) => data.slice(0, 10));
        //   }
        // },
        width: {
          type: "text",
          label: "Width (% or px)",
        },
        height: {
          type: "text",
          label: "Height",
        },
        margin: {
          type: "text",
          label: "Margin (px)",
        },
        padding: {
          type: "text",
          label: "Padding (px)",
        },
        altText: {
          type: "text",
          label: "Alt Text",
        },
        alignment: {
          type: "radio",
          label: "Image Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
        objectFit: {
          type: "select",
          label: "Object Fit",
          options: [
            { value: "fill", label: "Fill" },
            { value: "contain", label: "Contain" },
            { value: "cover", label: "Cover" },
            { value: "none", label: "None" },
            { value: "scale-down", label: "Scale Down" },
          ],
        },
        objectPosition: {
          type: "select",
          label: "Object Position",
          options: [
            { value: "top", label: "Top" },
            { value: "right", label: "Right" },
            { value: "bottom", label: "Bottom" },
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
          ],
        },
        aspectRatio: {
          type: "radio",
          label: "Aspect Ratio",
          options: [
            { value: "auto", label: "Auto" },
            { value: "1/1", label: "1:1" },
            { value: "4/3", label: "4:3" },
            { value: "16/9", label: "16:9" },
            { value: "21/9", label: "21:9" },
          ],
        },
        border: {
          type: "object",
          label: "Image Border",
          objectFields: {
            width: { type: "number", label: "Width (px)" },
            style: {
              type: "select",
              label: "Style",
              options: [
                { value: "none", label: "None" },
                { value: "solid", label: "Solid" },
                { value: "dashed", label: "Dashed" },
                { value: "dotted", label: "Dotted" },
              ],
            },
            color: { type: "text", label: "Color (#hex)" },
          },
        },
        borderRadius: {
          type: "number",
          label: "Border Radius (px)",
        },
        boxShadow: {
          type: "text",
          label: "Box Shadow (px, #hex)",
        },
      },
      defaultProps: {
        link: "",
        imageUrl: "",
        border: { width: 0, style: "none", color: "#000000" },
        borderRadius: 0,
        boxShadow: "5px 5px 5px 5px #ffffff",
        width: "500px",
        height: "auto",
        margin: "0px",
        padding: "0px",
        altText: "",
        alignment: "center",
        objectFit: "cover",
        objectPosition: "center",
        aspectRatio: "auto",
      },
      render: ({
        link,
        imageUrl,
        border,
        borderRadius,
        boxShadow,
        width,
        height,
        margin,
        padding,
        altText,
        objectFit,
        objectPosition,
        aspectRatio,
        alignment,
      }) => {
        const imageStyle = {
          width,
          height,
          margin: `${margin}px`,
          padding: `${padding}px`,
          border: `${border.width}px ${border.style} ${border.color}`,
          borderRadius: `${borderRadius}`,
          boxShadow,
          objectFit,
          objectPosition,
          aspectRatio,
          alignSelf: alignment,
        };

        const containerStyle = {
          display: "flex",
          justifyContent:
            alignment === "center"
              ? "center"
              : alignment === "right"
                ? "flex-end"
                : "flex-start",
          width: "100%",
        };

        const ImageElement = (
          <img src={imageUrl} alt={altText} style={imageStyle} />
        );

        const AlignedImage = (
          <div style={containerStyle}>
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer">
                {ImageElement}
              </a>
            ) : (
              ImageElement
            )}
          </div>
        );

        return AlignedImage;
      },
    },
  },
};
