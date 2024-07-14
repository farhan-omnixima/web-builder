import { Button, Data, Puck, usePuck, Drawer, Config } from "@measured/puck";
import { config } from "@/components/builder-components";
import {
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  ZoomIn,
  ZoomOut,
  MoveLeft,
  Save,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Eye,
  Columns,
  AlignHorizontalJustifyCenter,
  GalleryVertical,
  Heading,
  Type,
  DiamondIcon,
  StickyNote,
  RectangleHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CustomHeader = ({ onPublish }: { onPublish: (data: Data) => void }) => {
  const { appState, dispatch } = usePuck();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-around border-b border-gray-300 bg-white p-4 text-black">
      <button
        title="Back"
        className="flex items-center justify-center rounded-xl bg-gray-200 p-1 text-black transition hover:bg-gray-300"
        onClick={() => router.back()}
      >
        <ChevronLeft />
        <span className="pr-2 text-sm">Dashboard</span>
      </button>
      <span className="flex-grow text-center font-semibold">
        Custom Web Builder
      </span>
      <div className="flex gap-2">
        <button
          title="Preview"
          className="flex items-center justify-center rounded-xl bg-yellow-500 p-2 text-white transition hover:bg-yellow-600"
          onClick={() => console.log("Preview button clicked")}
        >
          <Eye size={18} />
          {/* <span className="ml-2 text-sm">Preview</span> */}
        </button>
        <button
          title="Save"
          className="flex items-center justify-center rounded-xl bg-green-600 p-2 text-white transition hover:bg-green-500"
          onClick={() => console.log("Save button clicked")}
        >
          <Save size={18} />
          {/* <span className="ml-2 text-sm">Save</span> */}
        </button>
        <button
          title="Publish"
          className="flex items-center justify-center rounded-xl bg-blue-700 p-2 text-white transition hover:bg-blue-600"
          onClick={() => onPublish(appState.data)}
        >
          <Globe size={18} />
          {/* <span className="ml-2 text-sm">Publish</span> */}
        </button>
      </div>
    </header>
  );
};

const CustomPuck = ({
  dataKey,
  save,
}: {
  dataKey: string;
  save: (data: Data) => void;
}) => {
  const { appState, dispatch } = usePuck();
  const [zoom, setZoom] = useState(100);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setViewport(1280, "auto");
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    const container = document.getElementById("preview-container");
    if (container) {
      setContainerWidth(container.clientWidth);
      adjustZoom(container.clientWidth);
    }
  };

  const adjustZoom = (width: number) => {
    const currentViewportWidth = appState.ui.viewports.current.width;
    const newZoom = Math.min(
      Math.floor((width / currentViewportWidth) * 100),
      100,
    );
    setZoom(newZoom);
  };

  const setViewport = (width: number, height: number | "auto") => {
    dispatch({
      type: "setUi",
      ui: {
        ...appState.ui,
        viewports: {
          ...appState.ui.viewports,
          current: { width, height },
        },
      },
    });
    setTimeout(handleResize, 0);
  };

  const handleZoom = (newZoom: number) => {
    setZoom(newZoom);
  };

  const zoomIn = () => {
    const newZoom = Math.min(zoom + 25, 100);
    handleZoom(newZoom);
  };

  const zoomOut = () => {
    const newZoom = Math.max(zoom - 25, 25);
    handleZoom(newZoom);
  };

  return (
    <div className="flex h-screen flex-col">
      <CustomHeader onPublish={save} />
      <div className="flex flex-grow overflow-hidden">
        <div className="w-full overflow-y-auto border-r border-gray-300 bg-gray-100 p-4 md:w-[15%]">
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Components</h3>
            <Puck.Components />
          </div>
          <div className="hidden h-px w-full mb-4 bg-gray-400 md:block"></div>
          <div>
            <h3 className="mb-2 font-semibold">Outline</h3>
            <Puck.Outline />
          </div>
        </div>
        <div className="w-full overflow-y-auto border-l border-r border-gray-300 bg-gray-200 px-4 md:w-[70%]">
          <div className="mb-4 flex flex-wrap items-center justify-center space-x-2 space-y-2">
            <div className="flex space-x-2">
              <button
                title="360 Pixel"
                className={`rounded p-2 text-sm font-medium ${
                  appState.ui.viewports.current.width === 360
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setViewport(360, "auto")}
              >
                <Smartphone size={18} />
              </button>
              <button
                title="768 Pixel"
                className={`rounded p-2 text-sm font-medium ${
                  appState.ui.viewports.current.width === 768
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setViewport(768, "auto")}
              >
                <Tablet size={18} />
              </button>
              <button
                title="1280 Pixel"
                className={`rounded p-2 text-sm font-medium ${
                  appState.ui.viewports.current.width === 1280
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setViewport(1280, "auto")}
              >
                <Monitor size={18} />
              </button>
            </div>
            <div className="hidden h-6 w-px bg-gray-400 md:block"></div>
            <div className="flex items-center space-x-2">
              <button
                title="Zoom Out"
                className="rounded p-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={zoomOut}
              >
                <ZoomOut size={18} />
              </button>
              <select
                title="Zoom Level"
                value={zoom}
                onChange={(e) => handleZoom(Number(e.target.value))}
                className="rounded border border-gray-300 bg-white px-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 md:px-8"
              >
                <option value={25}>25%</option>
                <option value={50}>50%</option>
                <option value={75}>75%</option>
                <option value={100}>100%</option>
              </select>
              <button
                title="Zoom In"
                className="rounded p-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={zoomIn}
              >
                <ZoomIn size={18} />
              </button>
            </div>
          </div>
          <div id="preview-container" className="flex justify-center">
            <div
              className="border border-gray-300 bg-white"
              style={{
                width: `${Math.min(
                  appState.ui.viewports.current.width,
                  containerWidth,
                )}px`,
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top center",
                transition: "transform 0.3s ease",
              }}
            >
              <Puck.Preview />
            </div>
          </div>
        </div>
        <div className="w-full overflow-y-auto border-l border-gray-300 bg-gray-100 p-4 md:w-[15%]">
          <h3 className="mb-2 font-semibold">Properties</h3>
          <Puck.Fields />
        </div>
      </div>
    </div>
  );
};

const componentIcons = {
  Columns: Columns,
  Flex: AlignHorizontalJustifyCenter,
  "Vertical Space": GalleryVertical,
  Heading: Heading,
  Text: Type,
  "Button Group": DiamondIcon,
  Card: StickyNote,
  Section: RectangleHorizontal,
};

type ComponentKey = keyof typeof componentIcons;

const CustomDrawer = () => {
  const [openCategories, setOpenCategories] = useState<string[]>(
    Object.keys(config.categories ?? {}).filter(
      (key) => config.categories?.[key]?.defaultExpanded,
    ),
  );

  const drawerItemShow = false;

  const toggleCategory = (categoryKey: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryKey)
        ? prev.filter((key) => key !== categoryKey)
        : [...prev, categoryKey],
    );
  };

  return (
    <div className="relative">
      <Drawer direction="horizontal">
        <div className="h-full overflow-y-auto">
          <div className="mb-4 flex flex-col py-2">
            {Object.entries(config.categories ?? {}).map(
              ([categoryKey, category]) => (
                <div key={categoryKey} className="mb-4">
                  <button
                    onClick={() => toggleCategory(categoryKey)}
                    className="mb-2 flex w-full items-center justify-between rounded p-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span>{category.title}</span>
                    <span>
                      {openCategories.includes(categoryKey) ? (
                        <ChevronDown size={14} />
                      ) : (
                        <ChevronRight size={14} />
                      )}
                    </span>
                  </button>
                  {openCategories.includes(categoryKey) && (
                    <div className="grid grid-cols-2 gap-0">
                      {category.components?.map((componentKey, index) => {
                        const component = config.components[componentKey];
                        const Icon =
                          componentIcons[componentKey as ComponentKey];
                        if (!component) return null;

                        return (
                          <Drawer.Item
                            key={componentKey}
                            name={componentKey}
                            index={index}
                          >
                            {({ children }) => (
                              <div className="text-sm relative flex flex-col items-center justify-center m-1 rounded p-4 transition-colors duration-200 bg-white hover:bg-gray-300">
                                {Icon && (
                                  <>
                                    <Icon className="text-gray-700 mb-1" size={30} />
                                    <span className="text-[10px] text-center">{componentKey}</span>
                                  </>
                                )}
                                {drawerItemShow && children}
                              </div>
                            )}
                          </Drawer.Item>
                        );
                      })}
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default function CustomEditor({
  initialData,
  save,
}: {
  initialData: Data;
  save: (data: Data) => void;
}) {
  const componentKey = Buffer.from(
    `${Object.keys(config.components).join("-")}-${JSON.stringify(
      initialData,
    )}`,
  ).toString("base64");

  const key = `puck-demo:${componentKey}:${"page"}`;

  return (
    <>
      <Puck<Config>
        config={config}
        data={initialData}
        iframe={{ enabled: false }}
        overrides={{
          outline: ({ children }) => <div>{children}</div>,
          components: () => <CustomDrawer />,
          puck: () => <CustomPuck dataKey={key} save={save} />,
        }}
      />
    </>
  );
}
