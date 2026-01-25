export default function PageHero() {
  return (
    <div className="mb-12 text-center relative">
      <div className="absolute top-0 bottom-0 right-0 w-1/4 pointer-events-none hidden md:block">
        <img
          src="/src/assets/images/pattern.svg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute top-0 bottom-0 left-0 w-1/4 pointer-events-none hidden md:block">
        <img
          src="/src/assets/images/pattern.svg"
          alt=""
          className="w-full h-full object-cover rotate-180"
        />
      </div>

      <h1
        className="mb-4 relative bg-linear-to-r bg-clip-text text-transparent text-4xl"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #002623 0%, #428177 50%, #002623 100%)",
        }}
      >
        Discover Ancient Syria
      </h1>
      <p
        className="max-w-2xl mx-auto text-lg relative"
        style={{ color: "#3d3a3b" }}
      >
        Journey through millennia of history in the cradle of civilization. From
        Damascus' ancient souqs to Palmyra's desert ruins, experience Syria's
        rich cultural heritage.
      </p>

      <div className="mt-6 flex items-center justify-center gap-2">
        <div
          className="h-px w-20"
          style={{
            background: "linear-gradient(to right, transparent, #6b1f2a)",
          }}
        ></div>
        <div className="flex gap-1">
          <div
            className="w-2 h-2 rotate-45"
            style={{ backgroundColor: "#988561" }}
          ></div>
          <div
            className="w-2 h-2 rotate-45 bg-white border"
            style={{ borderColor: "#3d3a3b" }}
          ></div>
          <div
            className="w-2 h-2 rotate-45"
            style={{ backgroundColor: "#002623" }}
          ></div>
        </div>
        <div
          className="h-px w-20"
          style={{
            background: "linear-gradient(to left, transparent, #6b1f2a)",
          }}
        ></div>
      </div>
    </div>
  );
}
