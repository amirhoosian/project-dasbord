import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query GetProjects {
    project {
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
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p className="text-center mt-4">در حال بارگذاری...</p>;
  if (error) return <p className="text-center mt-4">خطا: {error.message}</p>;

  return (
    <div className="container mx-auto mt-10 p-4 rtl">
      <div className="flex justify-between items-center mb-6">
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <span>ایجاد پروژه جدید</span>
          <span className="ml-2 text-xl font-bold">+</span>
        </button>
        <h1 className="text-xl font-bold text-right">لیست پروژه‌ها</h1>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-right text-gray-700">
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
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium">{project.name}</td>
                <td className="px-4 py-3 truncate">
                  {project.description || "مشخص نشده"}
                </td>
                <td className="px-4 py-3">{project.start_date}</td>
                <td className="px-4 py-3">{project.due_date || "مشخص نشده"}</td>
                <td className="px-4 py-3">
                  {project.status === "تکمیل شده" ? (
                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                      تکمیل شده
                    </span>
                  ) : (
                    <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-sm">
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
      <div className="flex justify-between items-center mt-6">
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
          صفحه قبل
        </button>
        <span className="text-gray-600">صفحه 1 از 20</span>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
          صفحه بعد
        </button>
      </div>
    </div>
  );
}
