import { Link } from 'react-router-dom';
import './Breadcrumb.css';

interface BreadcrumbProps {
  items: { label: string; to?: string }[];
}

function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb">
      {items.map((item, i) => (
        <span key={i}>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
          {i < items.length - 1 && <span className="breadcrumb-separator"> &gt; </span>}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumb;