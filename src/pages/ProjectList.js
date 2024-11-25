import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query GetProjects($offset: Int!, $limit: Int!) {
    project(offset: $offset, limit: $limit) {
      id
      name
      description
      due_date
      start_date
      status
    }
  }
`;

export default function ProjectList() {
  const [page, setPage] = useState(1);
  const limit = 5; // تعداد آیتم‌ها در هر صفحه
  const offset = (page - 1) * limit;

  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { offset, limit },
  });

  if (loading) return <p className="mt-4 text-center">در حال بارگذاری...</p>;
  if (error) return <p className="mt-4 text-center">خطا: {error.message}</p>;

  return (
    <div className="container p-4 mx-auto mt-10 rtl">
      {/* عنوان و دکمه ایجاد پروژه */}
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          <span>ایجاد پروژه جدید</span>
          <span className="ml-2 text-xl font-bold">+</span>
        </button>
        <h1 className="text-xl font-bold text-right">لیست پروژه‌ها</h1>
      </div>

      {/* جدول پروژه‌ها */}
      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="text-right text-gray-700">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                عملیات
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                وضعیت
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                تاریخ پایان
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                تاریخ شروع
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                توضیحات
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                نام
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                ردیف
              </th>
            </tr>
          </thead>
          <tbody>
            {data.project.slice(0, 3).map((project, index) => (
              <tr
                key={project.id}
                className={`${
                  index % 2 !== 0 ? "bg-white" : "bg-gray-50"
                } text-gray-800 text-right`}
              >
                <td className="px-6 py-4 text-center">
                  <button className="text-gray-500 hover:text-gray-700">
                    ...
                  </button>
                </td>
                <td className="px-6 py-4 text-sm">
                  {project.status === "تکمیل شده" ? (
                    <span className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded-full">
                      تکمیل شده
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                      نامشخص
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  {project.due_date || "مشخص نشده"}
                </td>
                <td className="px-6 py-4 text-sm">
                  {project.start_date || "مشخص نشده"}
                </td>
                <td className="px-6 py-4 text-sm truncate">
                  {project.description || "مشخص نشده"}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  {project.name}
                </td>
                <td className="px-6 py-4 text-sm">{index + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* دکمه‌های صفحه‌بندی */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center">
          <button
            className={`px-4 py-2 ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } rounded`}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            صفحه قبل
          </button>

          <button
            className="px-4 py-2 ml-6 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setPage((prev) => prev + 1)}
          >
            صفحه بعد
          </button>
        </div>

        <span className="text-gray-600">
          صفحه {page} از {Math.ceil(100 / limit)}{" "}
          {/* فرض شده 100 آیتم وجود دارد */}
        </span>
      </div>
    </div>
  );
}
