export default function FeatureCard({ title, icon, description }) {
  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
