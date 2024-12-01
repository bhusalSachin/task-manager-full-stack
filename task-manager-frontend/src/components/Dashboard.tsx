import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm"; // Import TaskForm
import { useCookies } from "react-cookie"; // Import useCookies from react-cookie

// Define Task type for TypeScript
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false); // State for task form visibility
  const [cookie] = useCookies(["token"]); // Get token from cookies

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = cookie.token; // Get token from the cookie
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get("http://localhost:8000/tasks", {
        params: { page, search: searchQuery },
        headers: {
          Authorization: `Bearer ${token}`, // Send token from cookie for authentication
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks when the page or search query changes
  useEffect(() => {
    fetchTasks();
  }, [page, searchQuery]);

  const isOverdue = (dueDate: string) => {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    return taskDueDate < currentDate;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTaskCreated = () => {
    // Refresh the task list after a new task is created
    fetchTasks();
    setShowTaskForm(false); // Close the form after creating the task
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Task Dashboard
      </h1>

      {/* Add Task Button */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowTaskForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
          Add Task
        </button>
      </div>

      {/* Show Task Form */}
      {showTaskForm && <TaskForm onTaskCreated={handleTaskCreated} />}

      {/* Search input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search tasks by title or status"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-1/3"
        />
      </div>

      {/* Task List */}
      <div>
        {loading ? (
          <p className="text-center text-lg">Loading tasks...</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`p-4 border rounded-lg shadow-sm ${
                  isOverdue(task.dueDate)
                    ? "bg-red-100 border-red-300"
                    : "bg-white border-gray-300"
                }`}>
                <h3 className="text-xl font-semibold text-gray-800">
                  {task.title}
                </h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-gray-700 mt-2">
                  <strong>Due Date:</strong>{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong> {task.status}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50">
          Previous
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
