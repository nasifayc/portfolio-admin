import { getVisitHistory } from "@/actions/visit";
import HistoryList from "@/components/admin/visit/HistoryList";

async function VisitHistoryPage() {
  const data = await getVisitHistory();
  return <HistoryList data={data} />;
}

export default VisitHistoryPage;
