import { data } from "./transactions"

interface T {
  description: string
  amount: number
  date: string
}

function App() {
  const { transactions } = data

  function similarity(s1: any, s2: any) {
    let longer = s1
    let shorter = s2
    if (s1.length < s2.length) {
      longer = s2
      shorter = s1
    }
    let longerLength = longer.length
    if (longerLength == 0) {
      return 1.0
    }
    return (
      (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
    )
  }

  function editDistance(s1: string, s2: string) {
    s1 = s1.toLowerCase()
    s2 = s2.toLowerCase()

    var costs = new Array()
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0) costs[j] = j
        else {
          if (j > 0) {
            var newValue = costs[j - 1]
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
            costs[j - 1] = lastValue
            lastValue = newValue
          }
        }
      }
      if (i > 0) costs[s2.length] = lastValue
    }
    return costs[s2.length]
  }

  function longestCommonSubstring(str1: any, str2: any) {
    const table = Array(str1.length + 1)
      .fill(null)
      .map(() => Array(str2.length + 1).fill(0))
    let maxLength = 0
    let endIndex = 0

    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          table[i][j] = table[i - 1][j - 1] + 1
          if (table[i][j] > maxLength) {
            maxLength = table[i][j]
            endIndex = i - 1
          }
        } else {
          table[i][j] = 0
        }
      }
    }

    return str1.substring(endIndex - maxLength + 1, endIndex + 1)
  }

  const identifyRecurringTransactions = () => {
    const grouped = transactions.reduce((acc: any, t: T, i: number) => {
      if (!acc[t.description]) {
        acc[t.description] = []
      }
      acc[t.description].push(t)
      return acc
    }, {})

    const descriptions = Object.keys(grouped)

    for (let i = 0; i < descriptions.length - 1; i++) {
      console.log(descriptions[i])

      const sim = similarity(descriptions[i], descriptions[i + 1])
      if (sim >= 0.7 && sim !== 1) {
        const common = longestCommonSubstring(
          descriptions[i],
          descriptions[i + 1]
        )
        if (!grouped[common]) {
          grouped[common] = []
          grouped[common] = grouped[descriptions[i]].concat(
            grouped[descriptions[i + 1]]
          )
        } else {
          grouped[common] = grouped[descriptions[i]].concat(
            grouped[descriptions[i + 1]]
          )
        }
      }
    }

    return grouped
  }

  return (
    <>
      <div className="bg-blue-500 text-red-500">
        <button onClick={() => identifyRecurringTransactions()}>
          find recurring! (check logs)
        </button>
      </div>
    </>
  )
}

export default App
