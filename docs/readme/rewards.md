# Rewards and Payments

The Astar Peers Program provides a monthly reward to help participants cover part of the cost of operating a node.

The reward is not intended to reimburse all expenses. It is a contribution toward recurring costs such as hardware, electricity, storage, and internet access.

## Base Reward

The base reward is:

**USD 30 equivalent per month, paid in ASTR**

The actual number of ASTR tokens is adjusted using the relevant ASTR price and the 30-day Exponential Moving Average (EMA30).

[View the ASTR price reference chart](https://astar.subscan.io/tools/charts?type=price)


## Reward Categories

If multiple conditions apply in the same month, the first applicable condition in the following table takes precedence.

| Priority | Condition | Reward Rate |
|---:|---|---:|
| 1 | Required on-chain identity is not registered | No reward (0%) |
| 2 | Restoration or resynchronization has been reported and confirmed as in progress | 30% |
| 3 | Node is inactive or not operating outside a confirmed restoration or resynchronization period | No reward (0%) |
| 4 | Monthly uptime is 80% or more | 100% |
| 5 | Monthly uptime is below 80% | 50% |

Nodes that remain inactive for a long period, go offline frequently, or fail to stay synchronized are not eligible for rewards.

## Example Amounts

The examples below show the USD-equivalent value before conversion to ASTR:

| Reward rate | USD-equivalent amount |
|---|---:|
| 100% | USD 30 |
| 50% | USD 15 |
| 30% | USD 9 |
| 0% | USD 0 |

The final payment is made in ASTR, so the token amount varies with the price used for conversion.

## On-Chain Identity Adjustment

**If the required on-chain identity is not registered, no reward will be provided even if the node meets the uptime requirements. Please note this.**


## ASTR Conversion

- The base reward is denominated as USD 30.
- Payment is made in ASTR.
- The final ASTR amount is adjusted using EMA30.
- The value on the first day of the operating month is applied as the conversion rate.

## Payment Schedule

As a general rule:

1. The previous month's node activity is reviewed.
2. The applicable reward rate is determined.
3. The USD-equivalent reward is converted to ASTR.
4. Payment is made during the current month.

## Reward Funding

Rewards are paid from the [program wallet balance](https://astar.subscan.io/account/XMk7AFJR9MZFqMQwwghyiEdqJEu42TahSNkbY5SXbjws8Su) secured during the previous season.

If additional funding becomes necessary for future operation of the program, a new proposal may be considered.

## Related Pages

- [Program Overview](./program.md)
- [How to Join](./join.md)
- [Machine and Technical Requirements](./requirements.md)
- [Node Operation Rules](./operations.md)
