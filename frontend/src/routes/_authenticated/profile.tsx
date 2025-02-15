import { getUserQueryOptions } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { data, error, isPending } = useQuery(getUserQueryOptions);

  if (error) {
    // window.location.href = "http://localhost:3000/api/login";
    return <div>error</div>;
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-2">
      <p>
        Hello {data.user.family_name}{" "}
        <a
          href="/api/logout"
          className="rounded bg-blue-500 p-2 font-bold text-white"
        >
          logout
        </a>
      </p>
    </div>
  );
}
