export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">HiddenPixels</h1>
      <div className="flex justify-center gap-4">
        <a href="/encode" className="btn-primary">Hide Text</a>
        <a href="/decode" className="btn-secondary">Extract Text</a>
      </div>
    </div>
  );
}