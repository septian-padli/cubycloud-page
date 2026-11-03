import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { navigateDocs } from './content';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
export default function DocsLink({ href, onClick, ...props }: Props) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target || !href.startsWith('/docs')) return;
    event.preventDefault();
    navigateDocs(href);
  };
  return <a href={href} onClick={handleClick} {...props} />;
}
