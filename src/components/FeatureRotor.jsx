
const features = [
  {
    id: "altitude",
    name: "Altitude",
    label: "ALTITUDE",
    value: "12,500",
    unit: "ft",
    subtitle: "Know your altitude.",
    description:
      "View altitude telemetry from your flight simulator on a dedicated physical display.",
    detail: "Current altitude",
    icon: "/icons/features/altitude.svg",
    code: "01",
  },
  {
    id: "airspeed",
    name: "Airspeed",
    label: "AIRSPEED",
    value: "420",
    unit: "km/h",
    subtitle: "Read your speed.",
    description:
      "Keep aircraft speed visible on a separate display while you fly in your simulator.",
    detail: "Illustrative airspeed",
    icon: "/icons/features/airspeed.svg",
    code: "02",
  },
  {
    id: "heading",
    name: "Heading",
    label: "HEADING",
    value: "275°",
    unit: "DEG",
    subtitle: "Know your direction.",
    description:
      "See the aircraft heading at a glance without relying exclusively on the simulator screen.",
    detail: "Illustrative heading",
    icon: "/icons/features/heading.svg",
    code: "03",
  },
  {
    id: "attitude",
    name: "Pitch & Roll",
    label: "ATTITUDE",
    value: "+4.2°",
    unit: "PITCH",
    subtitle: "Understand your attitude.",
    description:
      "Explore pitch and roll telemetry, with separate visual indicators for the aircraft's attitude.",
    detail: "Illustrative pitch",
    icon: "/icons/features/pitch-roll.svg",
    code: "04",
  },
  {
    id: "instrument",
    name: "The Instrument",
    label: "OPENFLIGHT MINI",
    value: "FLIGHT",
    unit: "DATA",
    subtitle: "Flight data, made physical.",
    description:
      "A compact physical telemetry display designed to complement a desktop flight-simulator setup.",
    detail: "Physical telemetry display",
    icon: "/icons/features/instrument.svg",
    code: "05",
  },
];

function polar(cx, cy, radius, angle) {
  const radians = (angle * Math.PI) / 180;

  return {
    x: cx + Math.cos(radians) * radius,
    y: cy + Math.sin(radians) * radius,
  };
}

export default function FeatureRotor({
  activeIndex,
  onSelect,
}) {
  const cx = 150;
  const cy = 150;
  const radius = 105;
  const circumference = 2 * Math.PI * radius;
  const activeFeature = features[activeIndex];

  return (
    <div className="mx-auto w-full max-w-[290px] sm:max-w-[310px] lg:max-w-[330px] xl:max-w-[350px] text-cyan-300">
      <svg
        viewBox="0 0 300 300"
        className="w-full overflow-visible"
        role="group"
        aria-label="Select a flight instrument feature"
      >
        <defs>
          <filter
            id="ofm-rotor-glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              stdDeviation="3"
              result="blur"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer technical ring */}
        <circle
          cx={cx}
          cy={cy}
          r="124"
          fill="none"
          stroke="#263746"
          strokeWidth="1"
          strokeDasharray="1 6"
        />

        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="#263746"
          strokeWidth="2"
        />

        <circle
          cx={cx}
          cy={cy}
          r="82"
          fill="none"
          stroke="#263746"
          strokeWidth="1"
          strokeDasharray="2 5"
        />

        {/* Instrument graduation ticks */}
        {Array.from({ length: 72 }, (_, i) => {
          const angle = i * 5 - 90;
          const major = i % 6 === 0;
          const p1 = polar(
            cx,
            cy,
            major ? 78 : 82,
            angle
          );
          const p2 = polar(cx, cy, 87, angle);

          return (
            <line
              key={i}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={major ? "#7E9BAE" : "#354B5D"}
              strokeWidth={major ? 1.5 : 0.8}
            />
          );
        })}

        {/* Animated selected-feature arc */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="#00DDF0"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${circumference / 5} ${circumference * 4 / 5}`}
          transform={`rotate(${activeIndex * 72 - 90} ${cx} ${cy})`}
          filter="url(#ofm-rotor-glow)"
          className="transition-all duration-700 ease-in-out"
        />

        {/* Five selectable feature markers */}
        {features.map((feature, i) => {
          const point = polar(cx, cy, 124, -90 + i * 72);
          const selected = activeIndex === i;

          return (
            <g
              key={feature.id}
              role="button"
              tabIndex={0}
              aria-label={`Select ${feature.name}`}
              aria-pressed={selected}
              onClick={() => onSelect(i)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();
                  onSelect(i);
                }

                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  onSelect((i + 1) % features.length);
                }

                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  onSelect(
                    (i - 1 + features.length) %
                      features.length
                  );
                }
              }}
              className="cursor-pointer outline-none"
            >
              <circle
                cx={point.x}
                cy={point.y}
                r="18"
                fill={selected ? "#062633" : "#07111E"}
                stroke={selected ? "#00DDF0" : "#526576"}
                strokeWidth={selected ? 2 : 1.2}
                className="transition-all duration-300"
              />

              {selected && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="23"
                  fill="none"
                  stroke="#00DDF0"
                  strokeOpacity=".35"
                />
              )}

              <text
                x={point.x}
                y={point.y + 4}
                textAnchor="middle"
                fill={selected ? "#00DDF0" : "#A5B5C4"}
                fontSize="12"
                fontWeight="600"
                pointerEvents="none"
              >
                {feature.code}
              </text>
            </g>
          );
        })}

        {/* Centre readout */}
        <text
          x={cx}
          y="112"
          textAnchor="middle"
          fill="#00DDF0"
          fontSize="10"
          letterSpacing="1.4"
        >
          {activeFeature.label}
        </text>

        <text
          x={cx}
          y="163"
          textAnchor="middle"
          fill="#E8F7FF"
          fontSize={activeIndex === 4 ? "23" : "30"}
          fontFamily="monospace"
        >
          {activeFeature.value}
        </text>

        <text
          x={cx}
          y="186"
          textAnchor="middle"
          fill="#A7BDCD"
          fontSize="12"
          letterSpacing="1.5"
        >
          {activeFeature.unit}
        </text>

        <circle
          cx={cx}
          cy={cy + 48}
          r="2"
          fill="#00DDF0"
        />
      </svg>
    </div>
  );
}

export { features };
