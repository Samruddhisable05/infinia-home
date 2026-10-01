import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/services/apiClient";
import {
  MessageSquare,
  FileText,
  Package,
  Briefcase,
  Layers,
  Image as ImageIcon,
  FileDown,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Loader2,
  UserCheck
} from "lucide-react";

export function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "enquiries" | "quotes" | "products" | "projects" | "gallery" | "jobs" | "applications" | "blog" | "documents"
  >("enquiries");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Data states
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);

  // Simple Add Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemData, setNewItemData] = useState<any>({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    loadData();
  }, [activeTab, token]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      if (activeTab === "enquiries") {
        const data = await apiClient.get<any[]>("/contact");
        setEnquiries(data);
      } else if (activeTab === "quotes") {
        const data = await apiClient.get<any[]>("/quotes");
        setQuotes(data);
      } else if (activeTab === "products") {
        const data = await apiClient.get<any[]>("/products?active_only=false");
        setProducts(data);
      } else if (activeTab === "projects") {
        const data = await apiClient.get<any[]>("/projects?active_only=false");
        setProjects(data);
      } else if (activeTab === "gallery") {
        const data = await apiClient.get<any[]>("/gallery?active_only=false");
        setGallery(data);
      } else if (activeTab === "jobs") {
        const data = await apiClient.get<any[]>("/jobs?active_only=false");
        setJobs(data);
      } else if (activeTab === "applications") {
        const data = await apiClient.get<any[]>("/applications");
        setApplications(data);
      } else if (activeTab === "blog") {
        const data = await apiClient.get<any[]>("/blog?published_only=false");
        setBlogs(data);
      } else if (activeTab === "documents") {
        const data = await apiClient.get<any[]>("/documents?active_only=false");
        setDocuments(data);
      }
    } catch (err: any) {
      if (err.message?.includes("401") || err.message?.includes("token")) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(err.message || "Failed to load data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      if (activeTab === "enquiries") await apiClient.delete(`/contact/${id}`);
      if (activeTab === "quotes") await apiClient.delete(`/quotes/${id}`);
      if (activeTab === "products") await apiClient.delete(`/products/${id}`);
      if (activeTab === "projects") await apiClient.delete(`/projects/${id}`);
      if (activeTab === "gallery") await apiClient.delete(`/gallery/${id}`);
      if (activeTab === "jobs") await apiClient.delete(`/jobs/${id}`);
      if (activeTab === "applications") await apiClient.delete(`/applications/${id}`);
      if (activeTab === "blog") await apiClient.delete(`/blog/${id}`);
      if (activeTab === "documents") await apiClient.delete(`/documents/${id}`);
      loadData();
    } catch (err: any) {
      alert("Error deleting record: " + err.message);
    }
  };

  const handleUpdateStatus = async (id: number, endpoint: string, newStatus: string) => {
    try {
      await apiClient.put(`/${endpoint}/${id}`, { status: newStatus });
      loadData();
    } catch (err: any) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleCreateNewItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === "products") await apiClient.post("/products", newItemData);
      if (activeTab === "projects") await apiClient.post("/projects", newItemData);
      if (activeTab === "gallery") await apiClient.post("/gallery", newItemData);
      if (activeTab === "jobs") await apiClient.post("/jobs", newItemData);
      if (activeTab === "blog") await apiClient.post("/blog", newItemData);
      if (activeTab === "documents") await apiClient.post("/documents", newItemData);

      setShowAddModal(false);
      setNewItemData({});
      loadData();
    } catch (err: any) {
      alert("Failed to create record: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-600 font-heading font-extrabold text-white">
              I
            </span>
            <div>
              <h1 className="font-heading text-lg font-bold text-white">Infinia Admin Dashboard</h1>
              <p className="text-xs text-slate-400">FastAPI + PostgreSQL Management Suite</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                View Site
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              variant="destructive"
              size="sm"
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
          {[
            { id: "enquiries", label: "Contact Enquiries", icon: MessageSquare, count: enquiries.length },
            { id: "quotes", label: "Quote Requests", icon: FileText, count: quotes.length },
            { id: "products", label: "Products", icon: Package },
            { id: "projects", label: "Projects", icon: Layers },
            { id: "gallery", label: "Gallery", icon: ImageIcon },
            { id: "jobs", label: "Job Openings", icon: Briefcase },
            { id: "applications", label: "Applications", icon: UserCheck },
            { id: "blog", label: "Blog Posts", icon: FileText },
            { id: "documents", label: "Downloads", icon: FileDown },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-600/20"
                    : "bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Action Header */}
        <div className="mt-6 flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold capitalize text-white">{activeTab.replace("_", " ")}</h2>
          {["products", "projects", "gallery", "jobs", "blog", "documents"].includes(activeTab) && (
            <Button
              onClick={() => {
                setNewItemData({});
                setShowAddModal(true);
              }}
              size="sm"
              className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Plus className="h-4 w-4" />
              Add New {activeTab.slice(0, -1)}
            </Button>
          )}
        </div>

        {/* Content Area */}
        <div className="mt-6">
          {loading ? (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/40">
              <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 backdrop-blur-md">
              {/* CONTACT ENQUIRIES */}
              {activeTab === "enquiries" && (
                <div className="overflow-x-auto">
                  {enquiries.length === 0 ? (
                    <p className="py-8 text-center text-sm text-slate-500">No contact enquiries received yet.</p>
                  ) : (
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="border-b border-slate-800 text-slate-400 uppercase">
                        <tr>
                          <th className="py-3 px-4">Name</th>
                          <th className="py-3 px-4">Contact</th>
                          <th className="py-3 px-4">Message</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {enquiries.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-900/50">
                            <td className="py-3 px-4 font-semibold text-white">{item.name}</td>
                            <td className="py-3 px-4">
                              <div>{item.email}</div>
                              <div className="text-slate-500">{item.phone}</div>
                            </td>
                            <td className="py-3 px-4 max-w-xs truncate">{item.message}</td>
                            <td className="py-3 px-4">
                              <select
                                value={item.status}
                                onChange={(e) => handleUpdateStatus(item.id, "contact", e.target.value)}
                                className="rounded-lg bg-slate-800 px-2 py-1 text-xs border border-slate-700 text-slate-200 outline-none"
                              >
                                <option value="new">new</option>
                                <option value="read">read</option>
                                <option value="in_progress">in_progress</option>
                                <option value="resolved">resolved</option>
                              </select>
                            </td>
                            <td className="py-3 px-4">
                              <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* QUOTES */}
              {activeTab === "quotes" && (
                <div className="overflow-x-auto">
                  {quotes.length === 0 ? (
                    <p className="py-8 text-center text-sm text-slate-500">No quote requests submitted yet.</p>
                  ) : (
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="border-b border-slate-800 text-slate-400 uppercase">
                        <tr>
                          <th className="py-3 px-4">Name / Company</th>
                          <th className="py-3 px-4">Email / Phone</th>
                          <th className="py-3 px-4">Quantity / Location</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {quotes.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-900/50">
                            <td className="py-3 px-4 font-semibold text-white">
                              <div>{item.name}</div>
                              <div className="text-slate-500">{item.company || "N/A"}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div>{item.email}</div>
                              <div className="text-slate-500">{item.phone}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div>{item.quantity || "N/A"}</div>
                              <div className="text-slate-500">{item.location}</div>
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={item.status}
                                onChange={(e) => handleUpdateStatus(item.id, "quotes", e.target.value)}
                                className="rounded-lg bg-slate-800 px-2 py-1 text-xs border border-slate-700 text-slate-200 outline-none"
                              >
                                <option value="pending">pending</option>
                                <option value="reviewed">reviewed</option>
                                <option value="quoted">quoted</option>
                                <option value="rejected">rejected</option>
                              </select>
                            </td>
                            <td className="py-3 px-4">
                              <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* GENERIC LIST FOR PRODUCTS, PROJECTS, GALLERY, JOBS, BLOG, DOCUMENTS */}
              {["products", "projects", "gallery", "jobs", "applications", "blog", "documents"].includes(activeTab) && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(activeTab === "products" ? products :
                    activeTab === "projects" ? projects :
                    activeTab === "gallery" ? gallery :
                    activeTab === "jobs" ? jobs :
                    activeTab === "applications" ? applications :
                    activeTab === "blog" ? blogs : documents
                  ).map((item) => (
                    <div key={item.id} className="relative rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-slate-700">
                      <div className="flex items-start justify-between">
                        <h3 className="font-heading font-bold text-white text-sm">
                          {item.name || item.title || item.applicant_name}
                        </h3>
                        <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                        {item.description || item.excerpt || item.cover_letter || item.category || item.email}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                        <span>ID: #{item.id}</span>
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-amber-500">
                          {item.category || item.employment_type || item.file_type || (item.is_active ? "Active" : "Published")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ADD NEW ITEM MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h3 className="font-heading text-lg font-bold text-white mb-4">
              Add New {activeTab.slice(0, -1)}
            </h3>
            <form onSubmit={handleCreateNewItem} className="space-y-4 text-xs">
              <div>
                <label className="block mb-1 text-slate-400">Title / Name</label>
                <input
                  required
                  type="text"
                  value={newItemData.title || newItemData.name || ""}
                  onChange={(e) => setNewItemData({
                    ...newItemData,
                    title: e.target.value,
                    name: e.target.value
                  })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white outline-none"
                />
              </div>

              {activeTab === "products" && (
                <div>
                  <label className="block mb-1 text-slate-400">Short Description</label>
                  <input
                    type="text"
                    value={newItemData.short_description || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, short_description: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white outline-none"
                  />
                </div>
              )}

              {activeTab === "blog" && (
                <div>
                  <label className="block mb-1 text-slate-400">Content</label>
                  <textarea
                    required
                    rows={3}
                    value={newItemData.content || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, content: e.target.value, is_published: true })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white outline-none"
                  />
                </div>
              )}

              {activeTab === "documents" && (
                <div>
                  <label className="block mb-1 text-slate-400">File URL</label>
                  <input
                    required
                    type="text"
                    placeholder="/uploads/documents/doc.pdf"
                    value={newItemData.file_url || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, file_url: e.target.value, file_type: "pdf" })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white outline-none"
                  />
                </div>
              )}

              {activeTab === "gallery" && (
                <div>
                  <label className="block mb-1 text-slate-400">Image URL</label>
                  <input
                    required
                    type="text"
                    placeholder="/uploads/gallery/img.jpg"
                    value={newItemData.image || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, image: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white outline-none"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)} size="sm">
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
