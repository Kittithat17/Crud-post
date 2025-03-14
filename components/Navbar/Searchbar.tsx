import { Input } from "../ui/input";

const Searchbar = () => {
  return (
    <div className="grid w-full max-w-lg items-center gap-1.5">
    <Input placeholder="Search..." type="text" />
  </div>
  );
};
export default Searchbar;
