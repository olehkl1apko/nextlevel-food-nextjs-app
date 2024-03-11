interface Props {
  params: {
    slug: string;
  };
}
export default function BlogPostPage({ params }: Props) {
  return (
    <main>
      <h1>Blog Post</h1>
      <p>{params.slug}</p>
    </main>
  );
}
