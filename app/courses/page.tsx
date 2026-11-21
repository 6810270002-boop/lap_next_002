// app/courses/page.tsx
import Link from "next/link";

interface Course {
  id: string;
  name: string;
  credits: number;
}

const courses: Course[] = [
  { id: "0214213", name: "ชุดวิชากระวนการออกแบบซอฟต์แวร์แนวใหม่", credits: 3 },
  {
    id: "0214321",
    name: "ชุดวิชาการออกแบบและพัฒนาเว็บแอปพลิเคชัน",
    credits: 3,
  },
  { id: "0701333", name: "การจัดการช่องทางการตลาดสมัยใหม่", credits: 3 },
  {
    id: "0701334",
    name: "การสื่อสารทางการตลาดแบบบูรณาการอย่างสร้างสรรค์",
    credits: 3,
  },
];

export default function Courses() {
  return (
    <main className="p-12">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">รายวิชาของฉัน</h1>
      <div className="space-y-3">
        {courses.map((c: Course) => (
          <Link
            key={c.id}
            href={`/courses/${c.id}`}
            className="block p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-blue-500 hover:bg-blue-50"
          >
            <h2 className="font-bold text-blue-800">{c.id}</h2>
            <p className="text-gray-600">
              {c.name} • {c.credits} หน่วยกิต
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
