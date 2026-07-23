import { Card } from "../ui/card";

const GoalAchievement = ({ data }: any) => {
  const { status, missing_milestones, action_items } = data;

  const getStatusColor = (status: any) => {
    if (status === "Off Track") return "bg-red-500";
    if (status === "On Track") return "bg-green-500";
    return "bg-yellow-500"; // Default for neutral status
  };

  if (!missing_milestones && !action_items) {
    return (
      <Card className="bg-white shadow-lg rounded-lg p-8 h-full flex items-center justify-center">
        <h4 className="text-lg font-bold">Everything is on track !</h4>
      </Card>
    );
  }

  return (
    <Card className="p-8 h-full">
      <h2 className="text-2xl font-semibold mb-4">Goal Achievement</h2>

      <div className="flex items-center space-x-2 my-4 py-4">
        <span
          className={`px-3 py-1 text-white rounded-full ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      </div>

      {missing_milestones && (
        <Card className="bg-white shadow-lg rounded-lg p-8 mb-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Missing Milestones</h3>
            <ul className="list-disc pl-6 space-y-2">
              {missing_milestones.map((milestone: any, index: any) => (
                <li key={index} className="text-sm">
                  {milestone}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      {action_items && (
        <Card className="bg-white shadow-lg rounded-lg p-8 ">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Action Items</h3>
            <ul className="space-y-2">
              {action_items.map((action: any, index: any) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-sm">- {action}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}
    </Card>
  );
};

export default GoalAchievement;
