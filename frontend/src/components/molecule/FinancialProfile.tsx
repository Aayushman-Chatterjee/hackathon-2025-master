import { Card, CardContent, CardHeader } from "../ui/card";
// import { Avatar, AvatarImage } from "../ui/avatar";

import { useState } from "react";
import FadeIn from "../animation/FadeIn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Avatar, AvatarImage } from "../ui/avatar";
import Image from "../../assets/profile1.png";
import { FaLongArrowAltRight } from "react-icons/fa";
const FinancialProfile = ({
  loading,
  userData,
  classification,
  score,
}: any) => {
  const profileScore = score || userData?.profile_score?.score || 0;
  const typeInvestor =
    userData?.recommendations?.classification?.classification || "";

  const colorClass: any = {
    red: "from-red-400 to-red-600 border-red-700 shadow-md drop-shodow-md",
    yellow:
      "from-yellow-400 to-yellow-600 border-yellow-700 shadow-md drop-shodow-md",
    primary:
      "from-melrose-400 to-melrose-600 border-melrose-700 shadow-md drop-shodow-md",
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-4 h-full overflow-hidden">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Card className="flex-1 h-full min-w-[200px] group">
            <CardHeader className="text-center text-lg font-semibold text-melrose-700">
              Profile
            </CardHeader>
            <CardContent className="flex items-center cursor-pointer   justify-center text-xl font-bold text-melrose-700">
              <div className=" flex flex-col">
                <Avatar className="w-72 h-72 group-hover:scale-105 transition-all duration-700">
                  <AvatarImage src={Image} />
                </Avatar>
                <div
                  className={`px-4 py-2 bg-gradient-to-b ${
                    colorClass[
                      profileScore < 40
                        ? "red"
                        : profileScore < 75
                        ? "yellow"
                        : "primary"
                    ]
                  } border text-white rounded-full text-center translate-y-[-30px]`}
                >
                  {profileScore}% {typeInvestor.split("_").join(" ")}
                </div>
                <div className="inline-flex items-center space-x-2 gap-2 self-center text-xs translate-y-[-10px]">
                  View Details <FaLongArrowAltRight />
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>

        <div className="text-center space-y-2">
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Financial Profile Details</DialogTitle>
              <DialogDescription>
                Here are the full details of your financial classification.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-xl font-bold text-melrose-700">
                {typeInvestor.replace("_", " ")}
              </p>
              <p>{userData?.recommendations?.classification?.reasoning}</p>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default FinancialProfile;
