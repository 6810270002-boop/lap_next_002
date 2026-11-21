// app/courses/[id]/page.tsx
interface CourseDetail {
  name: string;
  desc: string;
  instructor: string;
}

// Record<string, CourseDetail> = object ที่ key เป็น string, value เป็น CourseDetail
const courseData: Record<string, CourseDetail> = {
  "0214213": {
    name: "ชุดวิชากระวนการออกแบบซอฟต์แวร์แนวใหม่",
    desc: "Next.js + React + DB",
    instructor: "อ.สิรินดา",
  },
  "0214321": {
    name: "ชุดวิชาการออกแบบและพัฒนาเว็บแอปพลิเคชัน",
    desc: "C/C++ พื้นฐาน",
    instructor: "อ.ประจำ",
  },
  "0701333": {
    name: "การจัดการช่องทางการตลาดสมัยใหม่",
    desc: "C/C++ พื้นฐาน",
    instructor: "อ.ประจำ",
  },
  "0701334": {
    name: "การสื่อสารทางการตลาดแบบบูรณาการอย่างสร้างสรรค์",
    desc: "C/C++ พื้นฐาน",
    instructor: "อ.ประจำ",
  },
};

export const instant = false;

// TypeScript: กำหนด type ให้ params
export default async function CourseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = courseData[id];

  if (!course) {
    return (
      <main className="p-12">
        <h1 className="text-red-500">ไม่พบรายวิชา {id}</h1>
      </main>
    );
  }

  return (
    <main className="p-12">
      <p className="text-gray-500 mb-2">รหัสรายวิชา: {id}</p>
      <h1 className="text-3xl font-bold text-blue-900">{course.name}</h1>
      <p className="mt-4 text-gray-700">{course.desc}</p>
      <p className="mt-2 text-gray-500">ผู้สอน: {course.instructor}</p>
    </main>
  );
}
