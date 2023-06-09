import Link from "next/link";
import Image from "next/image";

const Signin = ({ user, setUser, loginSubmit }) => {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center">
      <div className="md:w-1/2 flex justify-center">
        <div className="hidden md:block mr-2">
          <Image
            src={"/assets/images/bg3.png"}
            alt="signup background"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="md:w-1/2">
        <div className="flex flex-col h-full">
          <h1 className="head_text text-left">
            <span className="blue_gradient">Signin</span>
          </h1>
          <form
            onSubmit={loginSubmit}
            className="mt-10 w-full flex flex-col gap-7 glassmorphism flex-grow"
          >
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
            <div className="gap-5 justify-center item-center">
              <button
                type="submit"
                className="w-full px-5 py-1.5 text-sm bg-primary-orange justify-center rounded-full text-white"
              >
                Login
              </button>
            </div>
            <Link href="/auth/register" className="text-center">
              Haven't an account ? Sign inRegister
            </Link>
            <Link href="/auth/forget-password" className="text-center">
              Forget Password
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signin;
