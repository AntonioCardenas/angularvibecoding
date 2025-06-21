import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="data-container">
      <div class="data-header">
        <h1>My Data</h1>
        <p>Manage and view your application data</p>
      </div>

      <div class="data-content">
        <div class="data-card">
          <h3>Sample Data</h3>
          <p>This is a placeholder for your data management interface.</p>
          <div class="data-stats">
            <div class="stat">
              <span class="stat-label">Total Records</span>
              <span class="stat-value">1,234</span>
            </div>
            <div class="stat">
              <span class="stat-label">Active</span>
              <span class="stat-value">987</span>
            </div>
            <div class="stat">
              <span class="stat-label">Archived</span>
              <span class="stat-value">247</span>
            </div>
          </div>
        </div>

        <!-- Additional content to demonstrate scrolling -->
        <div class="data-tables">
          <div class="table-card">
            <h3>Recent Activity</h3>
            <div class="table-content">
              <div class="table-row header">
                <span>Date</span>
                <span>Action</span>
                <span>User</span>
                <span>Status</span>
              </div>
              <div class="table-row">
                <span>2024-01-15</span>
                <span>Data Update</span>
                <span>john&#64;example.com</span>
                <span class="status success">Completed</span>
              </div>
              <div class="table-row">
                <span>2024-01-14</span>
                <span>Data Export</span>
                <span>admin&#64;example.com</span>
                <span class="status success">Completed</span>
              </div>
              <div class="table-row">
                <span>2024-01-13</span>
                <span>Data Import</span>
                <span>user&#64;example.com</span>
                <span class="status pending">Pending</span>
              </div>
              <div class="table-row">
                <span>2024-01-12</span>
                <span>Data Backup</span>
                <span>system&#64;example.com</span>
                <span class="status success">Completed</span>
              </div>
              <div class="table-row">
                <span>2024-01-11</span>
                <span>Data Sync</span>
                <span>sync&#64;example.com</span>
                <span class="status error">Failed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .data-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        min-height: 100%;
      }

      .data-header {
        text-align: center;
        margin-bottom: 3rem;
      }

      .data-header h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 0.5rem;
      }

      .data-header p {
        font-size: 1.1rem;
        color: #718096;
        margin: 0;
      }

      .data-content {
        display: grid;
        gap: 2rem;
      }

      .data-card {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #e1e5e9;
      }

      .data-card h3 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 1rem;
      }

      .data-card p {
        color: #718096;
        line-height: 1.6;
        margin-bottom: 2rem;
      }

      .data-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
      }

      .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem;
        background: #f7fafc;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
      }

      .stat-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: #4a5568;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.5rem;
      }

      .stat-value {
        font-size: 2rem;
        font-weight: 700;
        color: #667eea;
      }

      .data-tables {
        margin-top: 2rem;
      }

      .table-card {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #e1e5e9;
      }

      .table-card h3 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 1.5rem;
      }

      .table-content {
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        overflow: hidden;
      }

      .table-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        padding: 1rem;
        border-bottom: 1px solid #e2e8f0;
        align-items: center;
      }

      .table-row:last-child {
        border-bottom: none;
      }

      .table-row.header {
        background: #f7fafc;
        font-weight: 600;
        color: #4a5568;
        text-transform: uppercase;
        font-size: 0.875rem;
        letter-spacing: 0.05em;
      }

      .table-row:not(.header) {
        background: white;
      }

      .table-row:not(.header):hover {
        background: #f7fafc;
      }

      .status {
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .status.success {
        background: #c6f6d5;
        color: #22543d;
      }

      .status.pending {
        background: #fef5e7;
        color: #744210;
      }

      .status.error {
        background: #fed7d7;
        color: #742a2a;
      }

      @media (max-width: 768px) {
        .data-container {
          padding: 1rem;
        }

        .data-header h1 {
          font-size: 2rem;
        }

        .data-stats {
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .table-row {
          grid-template-columns: 1fr;
          gap: 0.5rem;
          padding: 0.75rem;
        }

        .table-row.header {
          display: none;
        }

        .table-row:not(.header) {
          border-bottom: 2px solid #e2e8f0;
        }

        .table-row:not(.header) span {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-row:not(.header) span::before {
          content: attr(data-label);
          font-weight: 600;
          color: #4a5568;
          margin-right: 0.5rem;
        }
      }
    `,
  ],
})
export class Data {}
