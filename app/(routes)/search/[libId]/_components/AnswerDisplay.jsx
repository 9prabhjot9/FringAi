import React from 'react';
import SourceList from './SourceList';
import DisplaySummary from './DisplaySummary';

function AnswerDisplay({ chat }) {
  return (
    <div className="flex flex-col gap-6 pt-2">
    
      <div className="grid grid-cols-3 gap-4">
        <SourceList searchResult={chat?.searchResult} />
      </div>

      
      <div>
        <DisplaySummary aiResp={chat?.aiResp} />
      </div>
    </div>
  );
}

export default AnswerDisplay;