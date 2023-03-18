import { G, Line, Polygon } from "@react-pdf/renderer";
import classNames from "classnames";
import {
  GraphicDimensions,
  GraphicLimits,
  RenderTarget,
  Ticks,
} from "../graphic-renderer.types";
import {
  getTickNumbers,
  TICK_LINE_LENGTH,
  transformToSvgViewport,
} from "../graphic-utils";
import { GRAPHIC_MIN_PADDING } from "./svg-graphic-container";

export interface XAxisProps {
  dimensions: GraphicDimensions;
  limits: GraphicLimits;
  ticks: Ticks;
  target: RenderTarget;
}

export default function XAxis({
  dimensions,
  limits,
  ticks,
  target,
}: XAxisProps) {
  if (limits.yMin > 0 || limits.yMax < 0) {
    return <></>;
  }

  const tickPositions = getTickNumbers(
    limits.xMin,
    limits.xMax - limits.xMax * Number.EPSILON,
    ticks.xTicks
  ).map((x) => transformToSvgViewport({ x, y: 0 }, dimensions, limits));

  const startPoint = transformToSvgViewport(
    {
      x: limits.xMin,
      y: 0,
    },
    dimensions,
    limits
  );

  const endPoint = transformToSvgViewport(
    {
      x: limits.xMax,
      y: 0,
    },
    dimensions,
    limits
  );

  const trianglePoints = `${endPoint.x - GRAPHIC_MIN_PADDING},${
    endPoint.y - GRAPHIC_MIN_PADDING / 2
  } ${endPoint.x - GRAPHIC_MIN_PADDING},${
    endPoint.y + GRAPHIC_MIN_PADDING / 2
  } ${endPoint.x + GRAPHIC_MIN_PADDING},${endPoint.y}`;

  switch (target) {
    case "web":
      return (
        <g>
          <line
            x1={startPoint.x}
            y1={startPoint.y}
            x2={endPoint.x}
            y2={endPoint.y}
            className={classNames(
              "theme-light:stroke-black",
              "theme-dark:stroke-white",
              "stroke-[0.005]"
            )}
          />
          <polygon
            points={trianglePoints}
            className={classNames(
              "theme-light:fill-black",
              "theme-dark:fill-white"
            )}
          />
          {tickPositions.map(({ x, y }) => (
            <line
              x1={x}
              x2={x}
              y1={y + TICK_LINE_LENGTH / 2}
              y2={y - TICK_LINE_LENGTH / 2}
              className={classNames(
                "theme-light:stroke-black",
                "theme-dark:stroke-white",
                "stroke-[0.005]"
              )}
            />
          ))}
        </g>
      );

    case "pdf":
      return (
        <G>
          <Line
            x1={startPoint.x}
            y1={startPoint.y}
            x2={endPoint.x}
            y2={endPoint.y}
            style={{
              stroke: "black",
              strokeWidth: "0.005",
            }}
          />
          <Polygon
            points={trianglePoints}
            style={{
              fill: "black",
            }}
          />
          {tickPositions.map(({ x, y }) => (
            <Line
              x1={x}
              x2={x}
              y1={y + TICK_LINE_LENGTH / 2}
              y2={y - TICK_LINE_LENGTH / 2}
              style={{
                stroke: "black",
                strokeWidth: "0.005",
              }}
            />
          ))}
        </G>
      );
  }
}
