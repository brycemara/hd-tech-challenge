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

  const findRecurringTransactions = () => {
    const grouped = transactions.reduce((acc: any, t: T, i: number) => {
      if (!acc[t.description]) {
        acc[t.description] = []
      }
      acc[t.description].push(t)
      return acc
    }, {})

    const groups = Object.keys(grouped)

    for (let i = 0; i < groups.length - 1; i++) {
      console.log(groups[i])
      const sim = similarity(groups[i], groups[i + 1])
      if (sim >= 0.7 && sim !== 1) {
        grouped[groups[i]] = grouped[groups[i]].concat(grouped[groups[i + 1]])
      }
    }

    // const obj: any = {}
    // for (let i = 0; i < transactions.length - 1; i++) {
    //   const sim = similarity(
    //     transactions[i].description,
    //     transactions[i + 1].description
    //   )
    //   if (sim >= 0.7 && sim !== 1) {
    //     if (!obj[transactions[i].description]) {
    //       obj[transactions[i].description] = []
    //       obj[transactions[i].description].push(transactions[i])
    //     } else {
    //       obj[transactions[i].description].push(transactions[i])
    //     }
    //   }
    // }

    // console.log(obj)

    // const obj = transactions.reduce((acc:any, t:T, i:number) => {
    //   // go thru the transactions and compare them to each other
    //   // if they have a similarty > .70 then we're going to add them to the same array
    //   if()
    //   const sim = similarity("one-off meal", "special meal")

    // }, {

    // })

    // const sim = similarity("one-off meal", "special meal")
    // greater than 70%
  }

  return (
    <>
      <div className="bg-blue-500 text-red-500">
        <button onClick={() => findRecurringTransactions()}>
          find recurring!
        </button>
      </div>
    </>
  )
}

export default App
