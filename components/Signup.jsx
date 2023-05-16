import Link from "next/link";
import Image from "next/image";

const Signup = ({
  user,
  setUser,
  registerSubmit,
  rePassword,
  setRePassword,
}) => {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center">
      <div className="md:w-1/2 flex justify-center">
        <div className="hidden md:block mr-2">
          <Image
            src={"/assets/images/bg4.png"}
            alt="signup background"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="md:w-1/2">
        <div className="flex flex-col h-full">
          <h1 className="head_text text-left">
            <span className="blue_gradient">Signup</span>
          </h1>
          <form
            onSubmit={registerSubmit}
            className="mt-10 w-full flex flex-col gap-7 glassmorphism flex-grow"
          >
                  <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Name:
              </span>
              <input
                className="form_input"
                type="name"
                name="name"
                required
                placeholder="Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </label>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Email:
              </span>
              <input
                className="form_input"
                type="email"
                name="email"
                required
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </label>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Password:
              </span>
              <input
                className="form_input"
                type="password"
                name="password"
                required
                autoComplete="on"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </label>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Conform Password:
              </span>
              <input
                className="form_input"
                type="password"
                name="password"
                required
                autoComplete="on"
                placeholder="Password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
            </label>
            <div className="gap-5 justify-center item-center">
              <button
                type="submit"
                className="w-full px-5 py-1.5 text-sm bg-primary-orange justify-center rounded-full text-white"
              >
                Register
              </button>
            </div>
            <Link href="/auth/register" className="text-center">
              Have an account ? Sign in
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
