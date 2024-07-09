import { useState } from "react"
import { useSyncProviders } from "../hooks/useSyncProviders"
import { post } from "../utils/axios"

export const DiscoverWalletProviders = () => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [userAccount, setUserAccount] = useState<string>("")
  const [amount, setAmount] = useState<number>()
  const providers = useSyncProviders()

  // Connect to the selected provider using eth_requestAccounts.
  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts: any = await providerWithInfo.provider.request({
        method: "eth_requestAccounts"
      })
      console.log(providerWithInfo);
      setSelectedWallet(providerWithInfo)
      setUserAccount(accounts?.[0])
      console.log(typeof (userAccount))
    } catch (error) {
      console.error(error)
    }
  }
  function handleClickClaim() {
    if (!userAccount) {
      alert("Plsss connect your wallet before claim money");
      return;
    }
    let result = post('http://localhost:5000/api/claim', { userAccount: userAccount, amount: amount });
    console.log(result)
  }
  // Display detected providers as connect buttons.
  return (
    <>
      <h2>Wallets Detected:</h2>
      <div>
        {
          providers.length > 0 ? providers?.map((provider: EIP6963ProviderDetail) => (
            <button key={provider.info.uuid} onClick={() => handleConnect(provider)} >
              <img src={provider.info.icon} alt={provider.info.name} />
              <div>{provider.info.name}</div>
            </button>
          )) :
            <div>
              No Announced Wallet Providers
            </div>
        }
      </div>
      <hr />
      <h2>{userAccount ? "" : "No "}Wallet Selected</h2>
      {userAccount &&
        <div>
          <div>
            <img src={selectedWallet.info.icon} alt={selectedWallet.info.name} />
            <div>{selectedWallet.info.name}</div>
            <div>{userAccount}</div>
          </div>
        </div>

      }
      <hr />
      <h2>Claim money</h2>
      <div>
        <form onSubmit={()=>handleClickClaim()}>
          <input type="number" value={amount } onChange={(e)=>setAmount( Number(e.target.value))} step="any"/>
          <button type="submit">Claim</button>
        </form>
      </div>

    </>
  )
}

