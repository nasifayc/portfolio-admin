"use client";
import { clearVisitHistory } from "@/actions/visit";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import ClearHistoryButton from "./ClearHistoryButton";
// import  from "ua-parser-js";
const UAParser = require("ua-parser-js");

type Props = {
  data: { id: string; ip: string; userAgent: string; createdAt: Date }[] | null;
};

function HistoryList({ data }: Props) {
  const [localHistory, setLocalHistory] = useState(data ?? []);

  useEffect(() => {
    setLocalHistory(data ?? []);
  }, [data]);

  const clearHistoryLocally = () => {
    setLocalHistory((prev) => []);
  };

  return localHistory && localHistory.length > 0 ? (
    <>
      <ClearHistoryButton clearHistoryLocally={clearHistoryLocally} />
      <div>
        <Table>
          <TableCaption>Recent viewers</TableCaption>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>IP </TableHead>
              <TableHead>Device</TableHead>
              <TableHead>OS</TableHead>
              <TableHead>Browser</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localHistory.map((history, index) => {
              const parsed = new UAParser(history.userAgent);
              const browser = parsed.getBrowser(); // name, version
              const os = parsed.getOS(); // name, version
              const device = parsed.getDevice();
              return (
                <TableRow
                  key={history.id}
                  className={`${index % 2 !== 0 ? "bg-muted" : ""}`}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{history.ip}</TableCell>
                  <TableCell>{device.type || "Desktop"}</TableCell>
                  <TableCell>{`${os.name} ${os.version}`}</TableCell>
                  <TableCell>{`${browser.name} ${browser.version}`}</TableCell>
                  <TableCell>
                    {new Date(history.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  ) : (
    <div className="text-muted-foreground flex h-full items-center justify-center">
      No Visit History
    </div>
  );
}

export default HistoryList;
