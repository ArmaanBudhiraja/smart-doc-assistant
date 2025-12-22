export default function AnswerBox({ data }: any) {
  return (
    <div className="border p-4 rounded bg-gray-50">
      <p className="font-semibold mb-1">Answer</p>
      <p className="mb-4">{data.answer}</p>

      <p className="font-semibold">Sources</p>
      <ul className="text-sm list-disc ml-5">
        {data.sources.map((s: any, i: number) => (
          <li key={i}>
            Page {s.page}
          </li>
        ))}
      </ul>
    </div>
  );
}
