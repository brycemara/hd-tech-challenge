Recurring Transactions

Initial thinking:
We have:

- array of transactions with a time, description and amount

We want:

- to identify recurring transactions

Assumptions:

- 'identifying transactions' means grouping the recurring transactions together
- there should be no duplicate identities
- grouping thoughts ? using a reduce, creating a new array

Definition of recurring transaction:

- subscription, rent, weekly company lunch
- happens more than once
- is the same amount (?) - no not with the lunch

What do all these have in common?

- happens in cadence (i.e. rent is charged same day every month, subscription charged same day every month, lunch charged weekly)
- lunch could be any day though - just needs to be in a weekly window

Code thinking:

- group all the transactions with the same description together
- sort by time
- find the difference in the times
- if the difference in times is the same (maybe +/- a day)
- then its a recurring transaction
- add the recurring transaction to something (maybe object?)

something like :
groupedTransactions = {
"spotify": [
...transactions,
],
"other": [
...transactions
]
}

^^ not gonna work because of the strings not being ===
