import { IoHome } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";

const routes = [
    {
        path: '/',
        name: 'Главная',
        icon: <IoHome size={25} />
    },
    {
        path: '/payments',
        name: 'История',
        icon: <FaHistory size={25} />
    },
    {
        path: '/discount',
        name: 'Скидки',
        icon: <BiSolidDiscount size={25} />
    },
    {
        path: '/market',
        name: 'Маркет',
        icon: <FiShoppingBag size={25} />
    },
    {
        path: '/profile',
        name: 'Профиль',
        icon: <MdAccountCircle size={25} />
    },
]

export default routes