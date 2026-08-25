import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import RequestForm from './components/RequestForm.jsx';
import FilterBar from './components/FilterBar.jsx';
import RequestList from './components/RequestList.jsx';
import { initialRequests } from './data/initialRequests.js';
import { useState } from 'react';

const emptyForm = {
  requesterName: '',
  requestType: '',
  location: '',
  details: '',
  priority: 'normal',
};

function App() {
  const [requests, setRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState('all');
  const [formData, setFormData] = useState(emptyForm);

  const summary = requests.reduce(
    (accumulator, request) => {
      accumulator.total += 1;
      if (request.status === 'pending') accumulator.pending += 1;
      if (request.status === 'in-progress') accumulator.inProgress += 1;
      if (request.status === 'completed') accumulator.completed += 1;
      return accumulator;
    },
    { total: 0, pending: 0, inProgress: 0, completed: 0 }
  );

  const filteredRequests = requests.filter((request) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'pending') return request.status === 'pending';
    if (statusFilter === 'in-progress') return request.status === 'in-progress';
    return request.status === 'completed';
  });

  function handleAddRequest(requestData) {
    const nextId = `REQ-${String(requests.length + 1).padStart(3, '0')}`;
    const newRequest = {
      ...requestData,
      id: nextId,
      status: 'pending',
    };

    setRequests((currentRequests) => [newRequest, ...currentRequests]);
    setFormData({ ...emptyForm });
  }

  function handleDeleteRequest(requestId) {
    setRequests((currentRequests) => currentRequests.filter((request) => request.id !== requestId));
  }

  return (
    <>
      <AppHeader
        title="Campus Service Request"
        subtitle="LAB 4 Starter — เปลี่ยน DOM-driven UI เป็น State-driven React UI"
      />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <div className="workspace-grid">
          <RequestForm
            formData={formData}
            onFormChange={setFormData}
            onAddRequest={handleAddRequest}
          />
          <section className="panel" aria-labelledby="request-list-title">
            <div className="section-heading">
              <h2 id="request-list-title">รายการคำร้อง</h2>
              <FilterBar value={statusFilter} onFilterChange={setStatusFilter} />
            </div>
            <RequestList
              requests={filteredRequests}
              onDeleteRequest={handleDeleteRequest}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;

