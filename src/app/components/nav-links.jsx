import {
  HomeOutlined,
  FolderOutlined,
  CheckSquareOutlined,
  ShoppingOutlined,
  StarOutlined,
  CopyOutlined,
  FileTextOutlined,
  DollarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: './home', icon: HomeOutlined },
  { name: 'Categories', href: './categories', icon: FolderOutlined },
  { name: 'Recipe', href: './recipe', icon: CheckSquareOutlined },
  { name: 'Ingredients', href: './ingredients', icon: ShoppingOutlined },
  { name: 'Ratings', href: './ratings', icon: StarOutlined },
  { name: 'Requests', href: './requests', icon: CopyOutlined },
  { name: 'Diet Restrictions', href: './restrictions', icon: FileTextOutlined },
  { name: 'Invoices', href: './invoice', icon: DollarOutlined },
  { name: 'Payments', href: './payments', icon: DollarOutlined },
  { name: 'Clients', href: './clients', icon: TeamOutlined },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-800 p-3 text-sm font-medium text-gray-50 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${isActive ? 'bg-sky-100 text-blue-600' : ''
              }`}
          >
            <LinkIcon style={{ fontSize: '1.5rem' }} />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
