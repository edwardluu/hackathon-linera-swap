export const AMM_APPLICATION_ID = "e476187f6ddfeb9d588c7b45d3df334d5501d6499b3f9ad5595cae86cce16a65060000000000000000000000e476187f6ddfeb9d588c7b45d3df334d5501d6499b3f9ad5595cae86cce16a65080000000000000000000000";
export const FUN1_APP_ID = "e476187f6ddfeb9d588c7b45d3df334d5501d6499b3f9ad5595cae86cce16a65000000000000000000000000e476187f6ddfeb9d588c7b45d3df334d5501d6499b3f9ad5595cae86cce16a65020000000000000000000000";
export const FUN2_APP_ID = "e476187f6ddfeb9d588c7b45d3df334d5501d6499b3f9ad5595cae86cce16a65030000000000000000000000e476187f6ddfeb9d588c7b45d3df334d5501d6499b3f9ad5595cae86cce16a65050000000000000000000000";
export const ACCOUNT = "65adbf65c9c1f48a0f1f2d06e0780994dcf8e428ffd5ee53948b3bb6c572c66f"
export const CHAIN = "e54bdb17d41d5dbe16418f96b70e44546ccd63e6f3733ae3c192043548998ff3"
export const LIST_TOKEN = [
  {
    tokenIdx: 0,
    name: "MUN",
    price: 1.02,
    icon: 'PawPrint'
  },
  {
    tokenIdx: 1,
    name: "lnUSD",
    price: 1,
    icon: 'CircleDollarSign'
  }
]

export interface TokenInfo {
  tokenIdx: number,
  name: string,
  price: number,
  liquidity: number,
  icon: string
}