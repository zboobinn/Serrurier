import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const SuccessMessage = ({ message }) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
      <p className="text-sm text-green-500">{message}</p>
    </div>
  );
};

export default SuccessMessage;