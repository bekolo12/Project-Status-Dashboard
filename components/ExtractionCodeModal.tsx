import React from 'react';
import { X, Copy, Check } from 'lucide-react';

interface ExtractionCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
}

const ExtractionCodeModal: React.FC<ExtractionCodeModalProps> = ({ isOpen, onClose, code }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Extraction Code</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
          <div className="relative group">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              {code}
            </pre>
            <button 
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 bg-white rounded-md border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-600"
              title="Copy to clipboard"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtractionCodeModal;