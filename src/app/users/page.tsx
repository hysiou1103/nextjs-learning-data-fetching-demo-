type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export default async function UsersPage() {
  // 直接使用 async / await 在 server 端進行資料獲取，無需使用 useState / useEffect
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  console.log(users);
  return (
    <div className="grid grid-cols-2 gap-2 p-4">
      {users.map((user: User) => (
        <div
          key={user.id}
          className="flex items-center justify-between p-4 bg-white shadow rounded-lg text-gray-600"
        >
          <div className="flex flex-col space-y-1">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm ">{user.username}</p>
          </div>
          <div className="flex flex-col space-y-1 items-end">
            <div className="text-md">{user.email}</div>
            <div className="text-md">{user.phone}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
