import { Search } from "lucide-react";


const Searchbar = () => {
  return (
    <div className="relative hidden lg:block">
            <div className="flex h-10 items-center rounded-full bg-gray-100 px-4">
              <Search className="mr-2 h-4 w-4 text-gray-600" />
              <input
                type="search"
                placeholder="Search"
                className="w-full bg-transparent text-sm outline-none text-gray-600"
                
              />
            </div>
          </div>
  );
};
export default Searchbar;
