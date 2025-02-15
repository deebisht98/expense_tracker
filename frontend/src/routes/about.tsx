import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-gradient-to-r from-pink-600 to-orange-400 bg-clip-text p-4 text-center text-2xl font-bold text-transparent">
      Hi i am the developer of this project
    </div>
  );
}
