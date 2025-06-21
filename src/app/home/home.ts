import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="welcome-section">
        <h1>Welcome to AngularVibeCoding</h1>
        <p class="subtitle">Your modern Angular development workspace</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🚀</div>
          <h3>Modern Angular</h3>
          <p>Built with Angular 20 and the latest best practices</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Signals</h3>
          <p>Reactive state management with Angular signals</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🛡️</div>
          <h3>Type Safety</h3>
          <p>Full TypeScript support with strict type checking</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3>Modern UI</h3>
          <p>Clean and responsive design with CSS Grid and Flexbox</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🔐</div>
          <h3>Authentication</h3>
          <p>Secure authentication with route guards</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h3>Responsive</h3>
          <p>Mobile-first responsive design</p>
        </div>
      </div>

      <div class="stats-section">
        <div class="stat-card">
          <h4>Components</h4>
          <div class="stat-number">12+</div>
          <p>Reusable components</p>
        </div>

        <div class="stat-card">
          <h4>Services</h4>
          <div class="stat-number">3</div>
          <p>Core services</p>
        </div>

        <div class="stat-card">
          <h4>Routes</h4>
          <div class="stat-number">6</div>
          <p>Protected routes</p>
        </div>
      </div>

      <!-- Additional content to demonstrate scrolling -->
      <div class="additional-content">
        <h2>Additional Features</h2>
        <p>
          This content demonstrates the scrollable layout. The header and footer
          remain fixed while only the main content area scrolls.
        </p>

        <div class="content-blocks">
          <div class="content-block">
            <h3>Performance Optimized</h3>
            <p>
              Built with OnPush change detection strategy and signals for
              optimal performance.
            </p>
          </div>
          <div class="content-block">
            <h3>Accessibility First</h3>
            <p>
              Designed with accessibility in mind, following WCAG guidelines.
            </p>
          </div>
          <div class="content-block">
            <h3>SEO Friendly</h3>
            <p>
              Optimized for search engines with proper meta tags and semantic
              HTML.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .home-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        min-height: 100%;
      }

      .welcome-section {
        text-align: center;
        margin-bottom: 3rem;
        padding: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        color: white;
      }

      .welcome-section h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
        margin: 0;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-bottom: 3rem;
      }

      .feature-card {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        border: 1px solid #e1e5e9;
      }

      .feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      .feature-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        display: block;
      }

      .feature-card h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #2d3748;
      }

      .feature-card p {
        color: #718096;
        line-height: 1.6;
        margin: 0;
      }

      .stats-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 3rem;
      }

      .stat-card {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #e1e5e9;
      }

      .stat-card h4 {
        font-size: 1rem;
        font-weight: 600;
        color: #4a5568;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .stat-number {
        font-size: 2.5rem;
        font-weight: 700;
        color: #667eea;
        margin-bottom: 0.5rem;
      }

      .stat-card p {
        color: #718096;
        margin: 0;
        font-size: 0.9rem;
      }

      .additional-content {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #e1e5e9;
        margin-bottom: 2rem;
      }

      .additional-content h2 {
        font-size: 2rem;
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 1rem;
      }

      .additional-content > p {
        color: #718096;
        line-height: 1.6;
        margin-bottom: 2rem;
      }

      .content-blocks {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }

      .content-block {
        padding: 1.5rem;
        background: #f7fafc;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
      }

      .content-block h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 0.5rem;
      }

      .content-block p {
        color: #718096;
        line-height: 1.6;
        margin: 0;
      }

      @media (max-width: 768px) {
        .home-container {
          padding: 1rem;
        }

        .welcome-section {
          padding: 1.5rem;
        }

        .welcome-section h1 {
          font-size: 2rem;
        }

        .features-grid {
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .feature-card {
          padding: 1.5rem;
        }

        .stats-section {
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .content-blocks {
          grid-template-columns: 1fr;
          gap: 1rem;
        }
      }
    `,
  ],
})
export class Home {}
