interface QuestionItemProps {
  index: number;
  question: any;
  value: any;
  onChange: (id: string, value: any) => void;
}

export default function QuestionItem({
  index,
  question,
  value,
  onChange,
}: QuestionItemProps) {
  return (
    <div className="border rounded-xl p-4">
      <p className="font-medium mb-3">
        {index + 1}. {question.question}
      </p>

      {question.type === "mcq" && (
        <div className="space-y-2">
          {question.options.map((opt: string, i: number) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={question._id}
                checked={value === opt}
                onChange={() => onChange(question._id, opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === "true-false" && (
        <div className="flex gap-6">
          {["true", "false"].map((opt) => (
            <label key={opt} className="flex items-center gap-2">
              <input
                type="radio"
                name={question._id}
                checked={value === opt}
                onChange={() => onChange(question._id, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {question.type === "short-answer" && (
        <textarea
          className="w-full border rounded-lg p-2"
          rows={3}
          value={value || ""}
          onChange={(e) => onChange(question._id, e.target.value)}
          placeholder="Type your answer..."
        />
      )}
    </div>
  );
}
