"use client";
import { Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import CustomEditor from "@/components/builder/CustomEditor";

const save = (data: Data) => {
  console.log("Data saved", data);
};

export default function Editor() {
  const isEdit = true;
  const path = "/";
  const initialData: Data = {
    root: { props: { children: [] } },
    content: [
      {
        type: "Heading",
        props: {
          align: "text-center",
          level: 2,
          children: "Get started",
          padding: "p-2",
          size: "font-2xl",
          id: "1",
        },
      },
    ],
  };
  return <CustomEditor initialData={initialData} save={save} />;
}

// export default function Editor() {
//   return (
//     <>
//       <Puck
//         config={config}
//         data={initialData}
//         onPublish={save}
//         overrides={{
//           header: () => <CustomHeader onPublish={save}/>,
//         }}
//         headerTitle="Web Builder Editor"
//       />
//     </>
//   );
// }
