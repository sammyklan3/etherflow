import { useAccount } from 'wagmi';
import WalletOptions from './WalletOptions';
import ConnectWallet from './ConnectWallet';

function CheckWallet(){
    const { isConnected } = useAccount();

    if(isConnected){
        return <ConnectWallet />
    }
    return <WalletOptions />
}

const Profile = () => {
  return (
    <div>
      <CheckWallet />
    </div>
  )
}

export default Profile;
