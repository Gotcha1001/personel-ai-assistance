import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthContext } from "@/app/context/AuthContext";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { WalletCardsIcon } from "lucide-react";
import SmokeEffect from "@/app/_components/SmokeEffects/SmokeEffect";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function Profile({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useContext(AuthContext);

  const [maxToken, setMaxToken] = useState<number>(0);

  // to update the tokens
  const updateUserOrder = useMutation(api.users.UpdateTokens);

  useEffect(() => {
    if (user?.orderId) {
      setMaxToken(500000);
    } else {
      setMaxToken(10000);
    }
  }, [user]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <SmokeEffect isVisible={true} />
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{}</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="flex gap-4 items-center">
                {user?.picture && (
                  <Image
                    src={user?.picture}
                    alt="User"
                    height={150}
                    width={150}
                    className="w-[60px] h-[60px] rounded-full"
                  />
                )}
                <div className="">
                  <h2 className="font-bold text-lg"> {user?.name}</h2>
                  <h2 className="text-gray-500">{user?.email}</h2>
                </div>
              </div>
              <hr className="my-3"></hr>
              <div className="flex flex-col gap-2">
                <h2 className="font-bold">Token Usage</h2>
                <h2>
                  {user?.credits}/{maxToken}
                </h2>
                <Progress value={(user?.credits / maxToken) * 100} />
                <h2 className="flex justify-between px-2 mt-3 text-lg">
                  Current Plan
                  <span className="p-1 text-white bg-gradient-to-r from-purple-950 via-teal-500 to-indigo-700 rounded-md mb-2">
                    {!user?.orderId ? "Free Plan" : "Pro Plan"}
                  </span>
                </h2>
              </div>

              {!user?.orderId ? (
                <div className="p-4 border rounded-xl mt-4">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="font-bold text-lg">Pro Plan</h2>
                      <h2>500,000 Tokens</h2>
                    </div>
                    <h2 className="font-bold text-lg">R30/Month</h2>
                  </div>
                  <hr className="my-3" />
                  <Button className="w-full">
                    <WalletCardsIcon /> Upgrade (R30)
                  </Button>
                  <div className="mt-5">
                    <Button onClick={() => setOpenDialog(false)} variant="sex2">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button className="mt-4 w-full">Cancel Subscription</Button>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Profile;
