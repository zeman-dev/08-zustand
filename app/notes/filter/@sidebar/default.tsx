import css from '@/app/notes/filter/@sidebar/sidebar.module.css';
import Link from 'next/link';

export default function Sidebar() {
  const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      {tags.map(tag => {
        return (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
