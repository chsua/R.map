export default function Description({ content }: { content: string }) {
  return content.split('\n').map((text, index) => <p key={index}>{text}</p>);
}
