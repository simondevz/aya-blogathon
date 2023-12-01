export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1>Login Page</h1>
      <form className="flex flex-col gap-2 m-4 w-1/4">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
      </form>
      <div className="flex flex-col gap-2 w-1/4">
        <a>Login with your Username</a>
        <button>Login</button>
      </div>
    </div>
  );
}
