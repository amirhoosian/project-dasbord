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
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          <span>ایجاد پروژه جدید</span>
          <span className="ml-2 text-xl font-bold">+</span>
        </button>
        <h1 className="text-xl font-bold text-right">لیست پروژه‌ها</h1>
      </div>
      <div className="mt-6 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-md max-h-96">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="text-right text-gray-700 bg-gray-100">
              <th className="px-4 py-3">ردیف</th>
              <th className="px-4 py-3">نام</th>
              <th className="px-4 py-3">توضیحات</th>
              <th className="px-4 py-3">تاریخ شروع</th>
              <th className="px-4 py-3">تاریخ پایان</th>
              <th className="px-4 py-3">وضعیت</th>
              <th className="px-4 py-3">...</th>
            </tr>
          </thead>
          <tbody>
            {data.project.map((project, index) => (
              <tr
                key={project.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } text-gray-800 text-right`}
              >
                <td className="px-4 py-3">{offset + index + 1}</td>
                <td className="px-4 py-3 font-medium">{project.name}</td>
                <td className="px-4 py-3 truncate">
                  {project.description || "مشخص نشده"}
                </td>
                <td className="px-4 py-3">{project.start_date}</td>
                <td className="px-4 py-3">{project.due_date || "مشخص نشده"}</td>
                <td className="px-4 py-3">
                  {project.status === "تکمیل شده" ? (
                    <span className="px-2 py-1 text-sm text-green-600 bg-green-100 rounded-full">
                      تکمیل شده
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
                      نامشخص
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-gray-500 hover:text-gray-700">
                    ...
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-6">
        <button
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          صفحه قبل
        </button>
        <span className="text-gray-600">
          صفحه {page} از {Math.ceil(100 / limit)}{" "}
          {/* فرض کنید 100 آیتم کلی دارید */}
        </span>
        <button
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setPage((prev) => prev + 1)}
        >
          صفحه بعد
        </button>
      </div>
    </div>
  );
}
