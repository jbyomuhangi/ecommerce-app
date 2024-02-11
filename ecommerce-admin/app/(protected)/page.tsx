import { UserButton } from "@clerk/nextjs";

const HomePage = () => {
  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default HomePage;
