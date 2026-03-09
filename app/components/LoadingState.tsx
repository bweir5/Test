export function LoadingState() {
  const skeletonCard = (height: string) => (
    <div
      className="rounded-xl skeleton"
      style={{ height, border: "1px solid var(--border)" }}
    />
  );

  return (
    <div className="animate-fade-in">
      {/* Top row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {skeletonCard("120px")}
        {skeletonCard("120px")}
        {skeletonCard("120px")}
      </div>

      {/* CFA insight skeleton */}
      {skeletonCard("80px")}

      {/* Asset grids */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
        {skeletonCard("280px")}
        {skeletonCard("280px")}
        {skeletonCard("280px")}
        {skeletonCard("280px")}
      </div>

      {/* Loading indicator */}
      <div className="flex items-center justify-center mt-8 gap-3">
        <div
          className="w-5 h-5 rounded-full border-2 animate-spin"
          style={{
            borderColor: "var(--border)",
            borderTopColor: "#FD3D54",
          }}
        />
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          CFA analysis in progress · Evaluating all asset classes…
        </p>
      </div>
    </div>
  );
}
