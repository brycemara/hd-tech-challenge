import { data } from "./transactions"

interface T {
  description: string
  amount: number
  date: string
}

function App() {
  const { transactions } = data

  const descriptions = transactions.map((t) => t.description)

  const decuped: any = []
  const match = (str1: any, str2: any) => {
    const split1 = str1.split(" ")
    const split2 = str2.split(" ")
    const matched = split1.filter((sp1: any) => split2.includes(sp1)).join(" ")
    return matched ? matched : false
  }

  for (let i = 0; i < descriptions.length - 1; i++) {
    const matched = match(descriptions[i], descriptions[i + 1])
    console.log(matched)
    if (!matched) {
      continue
    }
    if (!decuped.includes(matched)) {
      decuped.push(matched)
    }
  }

  const groupedTransactions = transactions.reduce((acc: any, t: any) => {
    if (!acc["other"]) {
      acc["other"] = []
    }
    const find = decuped.find((d: any) => t.description.includes(d))
    if (!find) {
      acc["other"].push(t)
    }
    if (!acc[find]) {
      acc[find] = []
    }
    acc[find].push({ ...t, group: find })
    return acc
  }, {})

  const keys = Object.keys(groupedTransactions)

  const identifyRecurring = () => {
    const differentDays = keys.map((k) => {
      const transactions = groupedTransactions[k]
      for (let i = 1; i < transactions.length - 1; i++) {
        const date1 = new Date(transactions[i].date)
        const date2 = new Date(transactions[i - 1].date)
        const diffTime = Math.abs(date2 - date1)
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        transactions[i].diffDays = diffDays
      }
      return transactions
    })
    const recurringTransactions = differentDays
      .filter((dd) => dd.length > 1)
      .map((dd) => {
        for (let i = 1; i < dd.length - 1; i++) {
          const currentDay = dd[i].diffDays
          const high = dd[i].diffDays + 1
          const low = dd[i].diffDays - 1
          if (currentDay >= low && currentDay <= high) {
            return dd[i].group
          }
        }
      })
      .filter((d) => d !== undefined)
    return recurringTransactions
  }

  const recurring = identifyRecurring()
  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-8">
      <p>Your recurring transactions include:</p>
      {recurring.map((rt) => {
        return <p>{rt}</p>
      })}
    </div>
  )
}

export default App
