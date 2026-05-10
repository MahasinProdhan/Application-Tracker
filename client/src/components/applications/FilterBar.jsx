import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import { APPLICATION_STATUSES } from "../../utils/constants";

const FilterBar = ({
  search,
  status,
  sort,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onAddClick,
}) => (
  <div className="panel p-4 md:p-6">
    <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-app-text">Applications</h2>
        <p className="section-copy">
          Search, sort, and manage your full pipeline from one place.
        </p>
      </div>
      <Button onClick={onAddClick} className="md:w-auto">
        Add new application
      </Button>
    </div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Input
        label="Search company"
        placeholder="Search by company name"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <Select
        label="Status"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="all">All statuses</option>
        {APPLICATION_STATUSES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
      <Select
        label="Sort by date"
        value={sort}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value="desc">Newest first</option>
        <option value="asc">Oldest first</option>
      </Select>
    </div>
  </div>
);

export default FilterBar;
