interface User {
  clerkId: string;
  name: string;
  imageUrl?: string; // add imageUrl
}

interface UserListProps {
  users: User[];
  onClickUser: (clerkId: string) => void;
}

export default function UserList({ users, onClickUser }: UserListProps) {
  return (
    <div className="space-y-2">
      {users.map((user) => (
        <div
          key={user.clerkId}
          className="flex items-center gap-3 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
          onClick={() => onClickUser(user.clerkId)}
        >
          <img
            src={user.imageUrl || "/default-avatar.png"}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium">{user.name}</span>
        </div>
      ))}
    </div>
  );
}
