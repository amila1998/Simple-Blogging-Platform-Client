import Link from "next/link";


const Signin = ({ user, setUser, loginSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <div className="login-page">
        <form onSubmit={loginSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            type="password"
            name="password"
            required
            autoComplete="on"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <div className="row">
            <button type="submit">Login</button>
            <Link href="/auth/register">Register</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signin;
