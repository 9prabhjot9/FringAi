import Image from 'next/image';
import React from 'react';
import SourceList from './SourceList';

function AnswerDisplay({ chat }) {
  return (
     
    <div className="grid grid-cols-3 gap-4 pt-2 w-max-sm" >
      <SourceList searchResult={chat} />
    </div>
  );
}

export default AnswerDisplay;