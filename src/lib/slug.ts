// Astro 5 中内容集合条目的 id 会带 .md 后缀（如 "welcome.md"），
// 这里统一去掉，生成干净的 URL：/posts/welcome/
export function postSlug(id: string): string {
  return id.replace(/\.md$/i, '');
}
