import { IoHome } from "react-icons/io5";
import { BsArrowUpLeftCircle } from "react-icons/bs";
import { BiSolidDiscount } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";

const routes = [
    {
        path: '/',
        name: 'Главная',
        icon: <IoHome size={30} />
    },
    {
        path: '/payments',
        name: 'Платежи',
        icon: <BsArrowUpLeftCircle size={30} />
    },
    {
        path: '/discount',
        name: 'Скидки',
        icon: <BiSolidDiscount size={30} />
    },
    {
        path: '/market',
        name: 'Маркет',
        icon: <FiShoppingBag size={30} />
    },
    {
        path: '/profile',
        name: 'Профиль',
        icon: <MdAccountCircle size={30} />
    },
]

export default routes