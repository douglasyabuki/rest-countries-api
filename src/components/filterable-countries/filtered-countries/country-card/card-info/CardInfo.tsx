"use client";


export interface CardInfoProps {
  name: string;
  population: number;
  region: string;
  capital?: string;
}

export function CardInfo({
  name,
  population,
  region,
  capital,
}: CardInfoProps) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-2 p-4">
      <h3 className="py-1 text-lg font-bold">{name}</h3>
      <h4 className="flex gap-2 font-semibold">
        Population: <p>{population}</p>
      </h4>
      <h4 className="flex gap-2 font-semibold">
        Region: <p>{region}</p>
      </h4>
      <h4 className="flex gap-2 font-semibold">
        Capital: <p>{capital}</p>
      </h4>
    </div>
  );
}
