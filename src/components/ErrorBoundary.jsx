import { Component } from 'react';

export class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          maxWidth: '600px',
          margin: '2rem auto',
          fontFamily: 'system-ui, sans-serif',
          background: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '8px'
        }}>
          <h2 style={{ margin: '0 0 1rem', color: '#856404' }}>Erreur d'affichage</h2>
          <pre style={{ overflow: 'auto', margin: 0, fontSize: '0.85rem' }}>
            {this.state.error?.message || String(this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
