import { getVisitHistory } from "@/actions/visit";
import HistoryList from "@/components/admin/visit/HistoryList";
import React from "react";

async function VisitHistoryPage() {
  const data = await getVisitHistory();
  return <HistoryList data={data} />;
}

export default VisitHistoryPage;
