export default function CardMonitoring({
  className = "",
  title,
  content,
  footer,
  masuk,
  keluar,
}) {
  const isSplit = masuk !== undefined && keluar !== undefined;

  return (
    <div
      className={`bg-white text-black p-3 flex flex-col gap-4 rounded-lg border-s-4 duration-500 ease-in-out ${className}`}
    >
      <div className="text-xl font-medium">{title}</div>

      {isSplit ? (
        <div className="flex justify-between items-center text-2xl font-semibold px-4">
          <div className="flex items-center gap-2 text-green-600">
            <i className="fa-regular fa-circle-down"></i>
            {masuk}
          </div>
          <div className="flex items-center gap-2 text-red-600">
            <i className="fa-regular fa-circle-up"></i>
            {keluar}
          </div>
        </div>
      ) : (
        <div className="text-sm">{content}</div>
      )}

      <small className="italic text-zinc-500">{footer}</small>
    </div>
  );
}
