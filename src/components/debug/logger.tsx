import { useState, useEffect } from 'react';

interface LogEntry {
  timestamp: string;
  type: 'info' | 'error' | 'success';
  message: string;
  data?: any;
}

let logSubscribers: ((entry: LogEntry) => void)[] = [];

// Global logging function
export function debugLog(type: LogEntry['type'], message: string, data?: any) {
  const entry = {
    timestamp: new Date().toISOString(),
    type,
    message,
    data
  };
  
  // Notify all subscribers
  logSubscribers.forEach(subscriber => subscriber(entry));
  
  // Also log to console
  console.log(`[${entry.type.toUpperCase()}] ${message}`, data || '');
}

export function DebugLogger() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const subscriber = (entry: LogEntry) => {
      setLogs(prev => [...prev, entry]);
    };
    
    logSubscribers.push(subscriber);
    return () => {
      logSubscribers = logSubscribers.filter(sub => sub !== subscriber);
    };
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 rounded-full bg-gray-900 p-2 text-xs text-white opacity-50 hover:opacity-100"
      >
        Show Logs
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 overflow-auto rounded-lg border bg-white p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Debug Logs</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
      
      <div className="space-y-2">
        {logs.map((log, i) => (
          <div 
            key={i}
            className={`text-sm p-2 rounded ${
              log.type === 'error' ? 'bg-red-50 text-red-700' :
              log.type === 'success' ? 'bg-green-50 text-green-700' :
              'bg-gray-50 text-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{log.message}</span>
              <span className="text-xs opacity-50">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
            {log.data && (
              <pre className="mt-1 text-xs overflow-auto">
                {JSON.stringify(log.data, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}