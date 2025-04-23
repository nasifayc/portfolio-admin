"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";
import ClearHistoryButton from "./ClearHistoryButton";

type Props = {
  data: { id: string; ip: string; userAgent: string; createdAt: Date }[] | null;
};

function HistoryList({ data }: Props) {
  const [localHistory, setLocalHistory] = useState(data ?? []);

  useEffect(() => {
    setLocalHistory(data ?? []);
  }, [data]);

  const clearHistoryLocally = () => {
    setLocalHistory([]);
  };

  if (!localHistory || localHistory.length === 0) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        No Visit History
      </div>
    );
  }

  return (
    <>
      <ClearHistoryButton clearHistoryLocally={clearHistoryLocally} />
      <div>
        <Table>
          <TableCaption>Recent viewers</TableCaption>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>OS</TableHead>
              <TableHead>Browser</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localHistory.map((history, index) => {
              const parsed = new UAParser(history.userAgent);
              const browser = parsed.getBrowser();
              const os = parsed.getOS();
              const device = parsed.getDevice();

              return (
                <TableRow
                  key={history.id}
                  className={index % 2 !== 0 ? "bg-muted" : ""}
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
  );
}

export default HistoryList;
