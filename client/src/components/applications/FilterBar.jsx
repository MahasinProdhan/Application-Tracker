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
  <div className="panel p-4">
    <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
      <div className="min-w-0 flex-1 xl:max-w-md">
        <Input
          label="Search company"
          placeholder="Search by company name"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="w-full xl:w-52">
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
      </div>

      <div className="w-full xl:w-52">
        <Select
          label="Sort by date"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </Select>
      </div>

      <Button onClick={onAddClick} className="w-full xl:ml-auto xl:w-auto xl:self-end">
        Add new application
      </Button>
    </div>
  </div>
);

export default FilterBar;
