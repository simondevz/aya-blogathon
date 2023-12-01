export default function PostPage({ params }: { params: { post_id: number } }) {
  return (
    <div className="flex flex-col">
      <h1>This is where the actual posts will be</h1>
      <p>this page is for post {params.post_id}</p>
    </div>
  );
}
