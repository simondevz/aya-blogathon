export default function SignupPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1>Signup Page</h1>
      <form className="flex flex-col gap-2 m-4 w-1/4">
        <input name="username" placeholder="username" />
        <input name="first_name" placeholder="first_name" />
        <input name="last_name" placeholder="last_name" />
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="confirm_password" placeholder="confirm_password" />
        <div className="flex gap-2">
          <input name="role" id="role" type="checkbox" placeholder="role" />
          <label htmlFor="role">Become a Writer</label>
        </div>
      </form>
      <div className="flex flex-col gap-2 w-1/4">
        <button>Sign Up</button>
      </div>
    </div>
  );
}
