
const transactions = [
  {
    id: 1,
    agent: "Payment Agent",
    amount: "5 USDC",
    status: "Success",
    date: "Today",
  },
  {
    id: 2,
    agent: "Trading Agent",
    amount: "25 USDC",
    status: "Rejected",
    date: "Today",
  },
  {
    id: 3,
    agent: "Payment Agent",
    amount: "2 USDC",
    status: "Success",
    date: "Yesterday",
  },
  {
    id: 4,
    agent: "Research Agent",
    amount: "15 USDC",
    status: "Rejected",
    date: "Yesterday",
  },
];

export default function TransactionTable() {
  return (
    <section className="bg-surface border border-gray-800 rounded-xl p-6 mt-6">

      <h2 className="text-xl font-semibold text-white mb-6">
        Recent Transactions
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">

          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-800">
              <th className="pb-4 pr-4">Agent</th>
              <th className="pb-4 pr-4">Amount</th>
              <th className="pb-4 pr-4">Status</th>
              <th className="pb-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-gray-800 last:border-0"
              >
                <td className="py-4 pr-4 text-white">
                  {tx.agent}
                </td>

                <td className="pr-4 text-gray-300">
                  {tx.amount}
                </td>

                <td className="pr-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      tx.status === "Success"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>

                <td className="text-gray-400 text-sm">
                  {tx.date}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </section>
  );
}
