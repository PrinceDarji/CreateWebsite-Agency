"use client";

import React, { useState } from "react";
import {
  Inbox,
  Search,
  Mail,
  Phone,
  Building,
  DollarSign,
  Briefcase,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export interface Lead {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  website?: string;
  service?: string;
  project_type?: string;
  budget?: string;
  message: string;
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "IN_PROGRESS" | "CONVERTED" | "CLOSED";
  created_at: string;
}

interface LeadsManagerProps {
  leads: Lead[];
  supabaseConfigured: boolean | null;
  onUpdateLeadStatus: (id: string, status: string) => Promise<void>;
  selectedLead: Lead | null;
  onSelectLead: (lead: Lead | null) => void;
}

export function LeadsManager({
  leads,
  supabaseConfigured,
  onUpdateLeadStatus,
  selectedLead,
  onSelectLead,
}: LeadsManagerProps) {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;
    const matchesSearch =
      search === "" ||
      lead.name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(search.toLowerCase()) ||
      lead.company?.toLowerCase().includes(search.toLowerCase()) ||
      lead.service?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  async function handleStatusChange(id: string, newStatus: string) {
    setUpdatingId(id);
    try {
      await onUpdateLeadStatus(id, newStatus);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-[#0c0c0c] p-5 rounded-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold uppercase text-white">
            Inbound Leads Pipeline ({leads.length})
          </h2>
          <p className="text-xs font-mono text-white/50 mt-1">
            Review client project inquiries submitted through the contact page and service CTAs.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0c0c0c] p-4 rounded-xl border border-white/10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {["ALL", "NEW", "CONTACTED", "QUALIFIED", "IN_PROGRESS", "CONVERTED", "CLOSED"].map(
            (st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-widest cursor-pointer transition-colors ${
                  statusFilter === st
                    ? "bg-white text-black font-bold"
                    : "bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                {st}
              </button>
            )
          )}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search leads by name, email, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#141414] border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-red font-mono"
          />
        </div>
      </div>

      {/* Supabase connection notice */}
      {supabaseConfigured === false && (
        <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-xl text-amber-200 text-xs font-mono leading-relaxed">
          <strong>Notice:</strong> Supabase database credentials are not configured in{" "}
          <code>.env.local</code>. Contact submissions are sent directly via Resend email to{" "}
          <code>createforbrands@gmail.com</code>. To persist records in this table, add your Supabase credentials in System Health.
        </div>
      )}

      {/* Leads Table */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-xl overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-16">
            <Inbox className="w-8 h-8 text-white/20 mx-auto mb-3" />
            <p className="text-white/50 text-sm">No leads match the selected filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 font-mono uppercase tracking-widest text-xs text-white/60">
                <tr>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02]">
                    <td className="p-4">
                      <div className="font-bold text-white text-base">{lead.name}</div>
                      <div className="text-xs text-white/50 font-mono">{lead.email}</div>
                      {lead.phone && (
                        <div className="text-[11px] font-mono text-white/40">{lead.phone}</div>
                      )}
                    </td>
                    <td className="p-4 text-white/70 font-sans">{lead.company || "—"}</td>
                    <td className="p-4">
                      <span className="text-xs font-semibold text-white/90">
                        {lead.service || "General Inquiry"}
                      </span>
                      {lead.project_type && (
                        <div className="text-[11px] text-white/40 font-mono">
                          {lead.project_type}
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-mono text-xs text-white/60">
                      {lead.budget || "—"}
                    </td>
                    <td className="p-4">
                      <select
                        value={lead.status}
                        disabled={updatingId === lead.id}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="bg-[#141414] border border-white/20 rounded px-2.5 py-1 text-xs font-mono uppercase text-white focus:outline-none focus:border-brand-red cursor-pointer"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="CONVERTED">CONVERTED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onSelectLead(lead)}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white hover:text-black rounded text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-white/20 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-brand-red uppercase tracking-widest block mb-1">
                  Lead Record
                </span>
                <h3 className="text-2xl font-display font-bold text-white">
                  {selectedLead.name}
                </h3>
                <div className="text-xs font-mono text-white/50">{selectedLead.email}</div>
              </div>
              <button
                onClick={() => onSelectLead(null)}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <span className="text-xs font-mono text-white/40 block mb-1">Company</span>
                <span className="text-white font-medium">{selectedLead.company || "N/A"}</span>
              </div>
              <div>
                <span className="text-xs font-mono text-white/40 block mb-1">Phone</span>
                <span className="text-white font-medium">{selectedLead.phone || "N/A"}</span>
              </div>
              <div>
                <span className="text-xs font-mono text-white/40 block mb-1">
                  Service Requested
                </span>
                <span className="text-white font-medium">{selectedLead.service || "N/A"}</span>
              </div>
              <div>
                <span className="text-xs font-mono text-white/40 block mb-1">
                  Budget Range
                </span>
                <span className="text-white font-medium">{selectedLead.budget || "N/A"}</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-xs font-mono text-white/40 block mb-2">Project Message</span>
              <div className="bg-[#141414] p-4 rounded-lg border border-white/10 text-white/80 text-sm leading-relaxed whitespace-pre-line font-sans">
                {selectedLead.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/50">Status:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                  className="bg-[#141414] border border-white/20 rounded px-3 py-1.5 text-xs font-mono uppercase text-white focus:outline-none focus:border-brand-red"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="QUALIFIED">QUALIFIED</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="CONVERTED">CONVERTED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>

              <a
                href={`mailto:${selectedLead.email}?subject=Regarding your inquiry with CREATE Creative Production Studio`}
                className="px-5 py-2 bg-brand-red hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest text-xs rounded transition-colors"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
