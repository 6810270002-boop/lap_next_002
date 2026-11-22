"use client"; // ← บรรทัดแรกเสมอ
import { useState, useEffect, Suspense} from "react";
import type { ExternalItem } from "@/lib/external";
import { useRouter, useSearchParams } from "next/navigation";
function BlogSpaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // อ่านค่าเริ่มต้นจาก URL (?source=news)
  const initialSource =
    searchParams.get("source") === "news" ? "news" : "products";
  function selectSource(s: "products" | "news") {
    setSource(s);
    router.replace(`/blog-spa?source=${s}`); // ← ไม่ reload
  }
  const [items, setItems] = useState<ExternalItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [source, setSource] = useState<"products" | "news">("products");
  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/aggregate?source=${source}`)
      .then((r) => r.json())
      .then((data: { external: ExternalItem[] }) => {
        setItems(data.external);
        setIsLoading(false);
      });
  }, [source]); // ← ทํางานใหม่ทุกครั้งที่ source เปลี่ยน
  {
    /* ปุ่ม Tab — วางเหนือ items grid */
  }
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        🧩 Blog Aggregator (SPA)
      </h1>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => selectSource("products")}
          className={`px-4 py-1.5 rounded border ${
            source === "products"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => selectSource("news")}
          className={`px-4 py-1.5 rounded border ${
            source === "news"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          News
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-400">กําลังโหลด...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="p-4 bg-white rounded-lg border">
              <h2 className="font-bold text-blue-800">{item.title}</h2>
              <p className="text-gray-500 text-sm">{item.subtitle}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
   export default function BlogSpaPage() {
     return (
       <Suspense fallback={<p className="p-8 text-gray-400">กำลังโหลด...</p>}>
         <BlogSpaContent />
       </Suspense>
     );
   }