import MainLogo from "@/assets/MainLogo.png";
import { Link } from 'react-router'

const Logo = () => {
  return (
     <div className="text-xl sm:text-2xl font-bold text-black">
          <Link to='/'>
            <img className="h-[40px] md:h-[50px]" src={MainLogo} alt="Logo" />
          </Link>
        </div>
  )
}

export default Logo