import { useStore } from "./store";

const ProfileOverview = () => {
  const { profile, balance, spending, assets, liabilities } = useStore(
    (state) => state
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="mt-2">
          <div className="text-sm">Name: {profile.name}</div>
          <div className="text-sm">Score: {profile.score}</div>
          <div className="text-sm">Rewards: {profile.rewards}</div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold">Balance</h2>
        <div className="mt-2 text-green-500">₹{balance}</div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold">Spending</h2>
        <div className="mt-2 text-red-500">₹{spending}</div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold">Assets</h2>
        <div className="mt-2 text-blue-500">₹{assets}</div>
        <div className="mt-2 text-orange-500">Liabilities: ₹{liabilities}</div>
      </div>
    </div>
  );
};
