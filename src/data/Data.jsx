import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ReviewsIcon from "@mui/icons-material/Reviews";

export const SiderbarData = [
  {
    icon: HomeIcon,
    heading: "Dashboard",
    link: "/",
  },
  {
    icon: ShoppingCartIcon,
    heading: "Orders",
    link: "/orders",
  },
  {
    icon: CategoryIcon,
    heading: "Category",
    link: "/categories",
  },

  {
    icon: CardGiftcardIcon,
    heading: "Products",
    link: "/product",
  },
  {
    icon:ReviewsIcon,
    heading:'Reviews',
    link:'/reviews'
  },
  {
    icon: PeopleAltIcon,
    heading: "Customers",
    link: "/customers",
  },
  {
    icon: AdminPanelSettingsIcon,
    heading: "Admin",
    link: "/users",
  },
  
];
