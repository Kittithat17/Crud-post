import { TabsDemo } from "./Try";

export default function AdminMenu() {
  return (
    <div className="flex flex-col gap-5 px-10 ">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <TabsDemo />
      <hr />
    </div>
  );
}
