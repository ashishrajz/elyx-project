export default function ProfileCard({ profile }: { profile: any }) {
  return (
    <div className="border p-4 rounded flex items-center gap-4">
      {/* Left side: Image */}
      <img
        src={profile.imageUrl || "/default-avatar.png"}
        alt={profile.name}
        className="w-20 h-20 rounded-full object-cover"
      />

      {/* Right side: Details */}
      <div>
        <h2 className="font-bold text-lg">{profile.name}</h2>
        <p>Email: razzashishraj@gmail.com {profile.email}</p>
        <p>Age: 37 {profile.age}</p>
        <p>Goal: Reduce high cholesterol (LDL) and improve heart health through diet, exercise, supplements, and recovery tracking.{profile.goal}</p>
      </div>
    </div>
  );
}
