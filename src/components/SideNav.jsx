/* eslint-disable react/prop-types */
import { HiX } from "react-icons/hi";

const SideNav = (props) => {
  const { closeSideNav } = props;

  return (
    <>
      <div className="absolute left-0 top-0 h-screen w-3/4 bg-secondary transition duration-300 ease-in-out">
        <div className="flex h-[10vh] items-center justify-end px-6">
          <div onClick={() => closeSideNav()}>
            <HiX
              className="text-2xl font-semibold text-white hover:text-primary
            "
            />
          </div>
        </div>
        <div className=" flex h-1/2 flex-col items-start justify-center gap-4 p-4 text-3xl font-semibold tracking-wider text-white">
          <span className="hover:text-primary">Popular</span>
          <span className="hover:text-primary">Top Rated</span>
          <span className="hover:text-primary">Upcoming</span>
        </div>
      </div>
      <div className="absolute right-0 h-screen w-1/4 bg-black opacity-30"></div>
    </>
  );
};

export default SideNav;
