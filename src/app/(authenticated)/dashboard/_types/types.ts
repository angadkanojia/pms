interface DashboardTabProps {
  currentFilter: string;
  setFilterStatus: (status: string) => void;
}
interface DashboardCardProps {
    searchTerm: string;
    filterStatus: string;
    setFilterStatus: (status: string) => void;
  }