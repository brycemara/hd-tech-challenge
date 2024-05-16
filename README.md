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

Reflections:

1. How would you measure the accuracy of your approach?
   Unit testing!

2. How would you know whether solving this problem made a material impact on customers?
   I think with any new feature you would have user testing first with a pool of users (friends + family, beta testers) to ensure that this feature was desired by customers before having the engineering team start the development.

3. What other approaches would you investigate if you had more time?

What I'd do differently:

- would have looked at the data more closey initally & noticed to slight differences in the descriptions
- contemplated switching from focusing on descriptions to focusing on dates but didn't have time to pivot
- thoughts on dates were i could see if transactions were within month of eachother and then compare descriptions and if descriptions had a strong similarty then i could categorize that as a recurring transaction
- yeah, probably should have done that ^
