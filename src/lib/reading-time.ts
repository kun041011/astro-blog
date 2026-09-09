// 粗略估算中文阅读时长：中文字符约 300 字/分钟，英文单词约 200 词/分钟。
export function readingTime(rawMarkdown: string): number {
  const text = rawMarkdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`~[\]()!-]/g, ' ');
  const cjk = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const words = (text.match(/[A-Za-z0-9]+/g) || []).length;
  return Math.max(1, Math.ceil(cjk / 300 + words / 200));
}
