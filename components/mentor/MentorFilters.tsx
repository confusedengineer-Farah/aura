"use client";

interface MentorFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  availableOnly: boolean;
  setAvailableOnly: (value: boolean) => void;
}

export default function MentorFilters({
  search,
  setSearch,
  availableOnly,
  setAvailableOnly,
}: MentorFiltersProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-xl bg-slate-900 p-4 md:flex-row md:items-center md:justify-between">

      <input
        type="text"
        placeholder="Search mentors..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg bg-slate-800 px-4 py-3 outline-none ring-0 focus:border-purple-500 md:max-w-sm"
      />

      <label className="flex items-center gap-3 text-white">
        <input
          type="checkbox"
          checked={availableOnly}
          onChange={(e) =>
            setAvailableOnly(e.target.checked)
          }
          className="h-5 w-5 accent-purple-600"
        />

        Show Available Only
      </label>

    </div>
  );
}