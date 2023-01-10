import classNames from "classnames";
import { convertToViewPortCoordinates, Limits } from "./graphic";

interface XAxisProps {
  limits: Limits;
  xTicks: number;
}

export default function XAxis({ limits, xTicks }: XAxisProps) {
  const startPoint = convertToViewPortCoordinates([limits[0], 0], limits);
  const endPoint = convertToViewPortCoordinates([limits[2], 0], limits);
  const arrowPoints = [
    [endPoint[0] - 5, endPoint[1] - 3],
    [endPoint[0] - 5, endPoint[1] + 3],
    [endPoint[0] + 5, endPoint[1]],
  ]
    .map((p) => p.join(","))
    .join(" ");

  return (
    <>
      <line
        x1={startPoint[0]}
        y1={startPoint[1]}
        x2={endPoint[0]}
        y2={endPoint[1]}
        className={classNames("stroke-white", "stroke-1")}
      />
      <polygon points={arrowPoints} className={classNames("fill-white")} />
    </>
  );
}