import * as d3 from "d3";

const segments = [
  { value: 30, color: "#F24360", innerRadius: 60, outerRadius: 95 },
  { value: 40, color: "#202224", innerRadius: 100, outerRadius: 95 },
  { value: 30, color: "#f0effb", innerRadius: 120, outerRadius: 95 },
];

const total = segments.reduce((sum, seg) => sum + seg.value, 0);

export default function TestPieChart() {
  let startAngle = 0;
  return (
    <svg width={260} height={260}>
      <g transform="translate(130,130)">
        {segments.map((seg, i) => {
          const angle = (seg.value / total) * 2 * Math.PI;
          const arc = d3.arc()
            .innerRadius(seg.innerRadius)
            .outerRadius(seg.outerRadius)
            .startAngle(startAngle)
            .endAngle(startAngle + angle);
          const path = arc({
            innerRadius: seg.innerRadius,
            outerRadius: seg.outerRadius,
            startAngle,
            endAngle: startAngle + angle,
          });
          startAngle += angle;
          return <path key={i} d={path || undefined} fill={seg.color} />;
        })}
      </g>
      <text x="130" y="130" textAnchor="middle" dy="0.3em" fontSize="32" fontWeight="bold">82.3%</text>
      <text x="130" y="155" textAnchor="middle" fontSize="18" fill="#888">Total</text>
    </svg>
  );
} 
