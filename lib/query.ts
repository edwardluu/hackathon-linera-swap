import {
  gql,
} from "@apollo/client";


export const GET_BALANCE_1 = gql`
  query @api(name: balance1){
        accounts {
            entry(
                key: "User:90d81e6e76ac75497a10a40e689de7b912db61a91b3ae28ed4d908e52e44ef7f"
            ) {
                value
            }
        }
    }
`

export const GET_BALANCE_2 = gql`
  query @api(name: balance2){
        accounts {
            entry(
                key: "User:90d81e6e76ac75497a10a40e689de7b912db61a91b3ae28ed4d908e52e44ef7f"
            ) {
                value
            }
        }
    }
`

export const MAKE_SWAP = gql`
mutation Swap($owner: AccountOwner, $inputTokenIdx: Int!, $inputAmount: Amount!) @api(name: swap){
  swap( owner: $owner, inputTokenIdx: $inputTokenIdx, inputAmount: $inputAmount,
  )
}
`;
