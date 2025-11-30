// "use client";
// import dayjs from "dayjs";

// export default function CalendarHeatmap({ trades = [] }) {
//   const month = dayjs().month();
//   const year = dayjs().year();

//   // Group trades by date
//   const tradesByDate = trades.reduce((acc, t) => {
//     const d = dayjs(t.date).format("YYYY-MM-DD");
//     if (!acc[d]) acc[d] = [];
//     acc[d].push(t);
//     return acc;
//   }, {});

//   const days = Array.from({ length: dayjs().daysInMonth() }, (_, i) =>
//     dayjs(`${year}-${month + 1}-${i + 1}`)
//   );

//   return (
//     <div className="bg-white dark:bg-[#0d1628] rounded-xl shadow p-6 w-full">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
//         Trading Calendar
//       </h2>

//       {/* Week labels */}
//       <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">
//         {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
//           <div key={i} className="font-medium">
//             {d}
//           </div>
//         ))}
//       </div>

//       {/* Days grid */}
//       <div className="grid grid-cols-7 gap-1 sm:gap-2">
//         {days.map((d) => {
//           const dateKey = d.format("YYYY-MM-DD");
//           const list = tradesByDate[dateKey] || [];

//           const profit = list.reduce((sum, t) => sum + t.profit, 0);

//           // Color based on profit value
//           let boxColor =
//             profit > 0
//               ? "bg-green-600"
//               : profit < 0
//               ? "bg-red-600"
//               : "bg-gray-400 dark:bg-gray-700";

//           return (
//             <div
//               key={d.date()}
//               className={`
//                 flex flex-col items-center justify-center
//                 rounded-lg text-white 
//                 px-1 sm:px-2
//                 py-2
//                 min-h-[45px] sm:min-h-[55px]
//                 transition-all duration-200
//                 ${boxColor}
//               `}
//             >
//               {/* Day Number */}
//               <span className="font-bold text-xs sm:text-sm">{d.date()}</span>

//               {/* Profit Display */}
//               {list.length > 0 && (
//                 <span className="text-[10px] sm:text-xs font-semibold leading-none mt-1 break-words text-center">
//                   {profit > 0 ? "+" : ""}
//                   {profit}
//                 </span>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


"use client";
import dayjs from "dayjs";

export default function CalendarHeatmap({ trades = [] }) {
  const month = dayjs().month();
  const year = dayjs().year();

  // Group trades by SELL DATE
  const tradesByDate = trades.reduce((acc, t) => {
    const d = dayjs(t.sellDate || t.date).format("YYYY-MM-DD");
    if (!acc[d]) acc[d] = [];
    acc[d].push(t);
    return acc;
  }, {});

  const days = Array.from({ length: dayjs().daysInMonth() }, (_, i) =>
    dayjs(`${year}-${month + 1}-${i + 1}`)
  );

  return (
    <div className="bg-white dark:bg-[#0d1628] rounded-xl shadow p-6 w-full">
      
      {/* Month Title */}
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {dayjs().format("MMMM YYYY")}
      </h2>

      {/* Week labels */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="font-medium">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => {
          const dateKey = d.format("YYYY-MM-DD");
          const list = tradesByDate[dateKey] || [];

          const profit = list.reduce((sum, t) => sum + (Number(t.profit) || 0), 0);

          let boxColor =
            profit > 0
              ? "bg-green-600"
              : profit < 0
              ? "bg-red-600"
              : "bg-gray-400 dark:bg-gray-700";

          return (
            <div
              key={d.date()}
              className={`rounded-lg text-white flex flex-col items-center py-2 ${boxColor}`}
            >
              <span className="font-bold">{d.date()}</span>
              {list.length > 0 && (
                <span className="text-xs">{profit > 0 ? "+" : ""}{profit}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
