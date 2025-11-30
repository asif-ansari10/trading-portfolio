export default function KPIBox({ title, value, delta, icon }) {
  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md transition">
      <div className="flex justify-between mb-3">
        <p className="text-gray-800 dark:text-gray-300 font-semibold">{title}</p>
        <span className="text-2xl">{icon}</span>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h2>

      {delta !== undefined && (
        <p className="mt-3 text-green-500 text-sm">▲ {delta}%</p>
      )}
    </div>
  );
}
