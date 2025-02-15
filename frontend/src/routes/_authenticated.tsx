import { getUserQueryOptions } from "@/api/userApi";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const Login = () => {
  return (
    <div className="p-4 text-center">
      You have to{" "}
      <a
        href="/api/login"
        className="rounded bg-blue-500 p-2 font-bold text-white"
      >
        login
      </a>
    </div>
  );
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const data = await queryClient.fetchQuery(getUserQueryOptions);
      return data;
    } catch (error) {
      console.error(error);
      return { user: null };
    }
  },
  component: Component,
});

function Component() {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }
  return <Outlet />;
}
