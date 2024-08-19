import { gql } from "@apollo/client";

export const GET_BALANCE_1 = gql`
  query getBalance1($owner: AccountOwner!) @api(name: balance1) {
    accounts {
      entry(key: $owner) {
        value
      }
    }
  }
`;

export const GET_BALANCE_2 = gql`
  query getBalance2($owner: AccountOwner!) @api(name: balance2) {
    accounts {
      entry(key: $owner) {
        value
      }
    }
  }
`;

export const MAKE_SWAP = gql`
  mutation Swap($owner: AccountOwner, $inputTokenIdx: Int!, $inputAmount: Amount!) @api(name: swap) {
    swap(owner: $owner, inputTokenIdx: $inputTokenIdx, inputAmount: $inputAmount)
  }
`;
